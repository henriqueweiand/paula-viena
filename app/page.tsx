'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

// ── Types ─────────────────────────────────────────────────────────────
type Status = 'pending' | 'paid' | 'overdue' | 'draft';
type Language = 'en' | 'pt' | 'es' | 'fr' | 'de';

interface LineItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  rate: number;
}

interface InvoiceData {
  invoiceNumber: string;
  status: Status;
  invoiceDate: string;
  currency: string;
  billToName: string;
  billToAddress: string;
  billToCity: string;
  billToZip: string;
  billToCountry: string;
  billFromName: string;
  billFromAddress: string;
  billFromCity: string;
  billFromZip: string;
  billFromCountry: string;
  taxDetails: string;
  items: LineItem[];
  vatRate: number;
  contact: string;
  notes: string;
  reference: string;
}

// ── Translations ──────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    appName: 'Invoice Generator',
    language: 'Language',
    clear: 'Clear',
    preview: 'Preview',
    printSave: 'Print / Save PDF',
    savedAt: (time: string) => `Saved ${time}`,
    invoiceDetails: 'Invoice Details',
    billFromCard: 'Bill From (You)',
    billToCard: 'Bill To (Client)',
    taxDetailsCard: 'Tax Details (Optional)',
    lineItems: 'Line Items',
    footerDetails: 'Footer Details',
    invoiceNum: 'Invoice #',
    statusField: 'Status',
    invoiceDateField: 'Invoice Date',
    currencyField: 'Currency',
    pending: 'Pending',
    paid: 'Paid',
    overdue: 'Overdue',
    draft: 'Draft',
    companyName: 'Company / Name',
    streetAddress: 'Street Address',
    city: 'City',
    zip: 'ZIP',
    country: 'Country',
    taxInfo: 'Tax Information',
    taxPlaceholder: 'e.g. VAT number, tax ID…',
    descriptionCol: 'Description',
    qtyCol: 'Qty',
    unitCol: 'Unit',
    rateCol: 'Rate',
    addLineItem: 'Add Line Item',
    subtotal: 'Subtotal',
    vatPct: 'VAT (%)',
    totalDue: 'Total Due',
    contactField: 'Contact',
    notesField: 'Notes',
    referenceId: 'Reference ID',
    previewInvoice: 'Preview Invoice',
    printSaveAs: 'Print / Save as PDF',
    invoicePreview: 'Invoice Preview',
    previewSubtitle: 'This is how your invoice will look when printed',
    printBtn: 'Print',
    invoiceLabel: 'I N V O I C E',
    billToLabel: 'Bill To:',
    billFromLabel: 'Bill From:',
    taxDetailsLabel: 'Tax Details:',
    invoiceNumLabel: '#',
    statusLabel: 'Status',
    invoiceDateLabel: 'Invoice date',
    totalAmountLabel: 'Total amount',
    descLabel: 'DESCRIPTION',
    qtyUnitLabel: 'QTY (UNIT)',
    rateLabel: 'RATE',
    totalLabel: 'TOTAL',
    vatLabel: 'VAT',
    totalDueLabel: 'Total Due',
    contactLabel: 'Contact:',
    noteLabel: 'Note',
    pageOf: 'PAGE 1 OUT OF 1',
    disclaimer: 'The responsibility to ensure compliance and validity rests with the invoicing party.',
    billFromPlaceholder: 'Your company name',
    billToPlaceholder: 'Client name or company',
    contactPlaceholder: '+1 555 000 0000',
    noteItems: '- Contract value\n- English lessons\n- Health Related Expenses',
    refPlaceholder: 'e.g. a2bbb9c8-ce9e-4798-bdd8-25453930b2ad',
    streetPlaceholder: '123 Main St',
  },
  pt: {
    appName: 'Gerador de Faturas',
    language: 'Idioma',
    clear: 'Limpar',
    preview: 'Pré-visualizar',
    printSave: 'Imprimir / Salvar PDF',
    savedAt: (time: string) => `Salvo às ${time}`,
    invoiceDetails: 'Detalhes da Fatura',
    billFromCard: 'De (Você)',
    billToCard: 'Para (Cliente)',
    taxDetailsCard: 'Dados Fiscais (Opcional)',
    lineItems: 'Itens da Fatura',
    footerDetails: 'Rodapé',
    invoiceNum: 'Nº da Fatura',
    statusField: 'Status',
    invoiceDateField: 'Data da Fatura',
    currencyField: 'Moeda',
    pending: 'Pendente',
    paid: 'Pago',
    overdue: 'Atrasado',
    draft: 'Rascunho',
    companyName: 'Empresa / Nome',
    streetAddress: 'Endereço',
    city: 'Cidade',
    zip: 'CEP',
    country: 'País',
    taxInfo: 'Informações Fiscais',
    taxPlaceholder: 'ex. CNPJ, CPF, inscrição estadual…',
    descriptionCol: 'Descrição',
    qtyCol: 'Qtd',
    unitCol: 'Unid.',
    rateCol: 'Valor Unit.',
    addLineItem: 'Adicionar Item',
    subtotal: 'Subtotal',
    vatPct: 'Impostos (%)',
    totalDue: 'Total a Pagar',
    contactField: 'Contato',
    notesField: 'Observações',
    referenceId: 'ID de Referência',
    previewInvoice: 'Pré-visualizar Fatura',
    printSaveAs: 'Imprimir / Salvar como PDF',
    invoicePreview: 'Pré-visualização da Fatura',
    previewSubtitle: 'É assim que sua fatura ficará quando impressa',
    printBtn: 'Imprimir',
    invoiceLabel: 'F A T U R A',
    billToLabel: 'Para:',
    billFromLabel: 'De:',
    taxDetailsLabel: 'Dados Fiscais:',
    invoiceNumLabel: 'Nº',
    statusLabel: 'Status',
    invoiceDateLabel: 'Data da fatura',
    totalAmountLabel: 'Valor total',
    descLabel: 'DESCRIÇÃO',
    qtyUnitLabel: 'QTD (UNID.)',
    rateLabel: 'VALOR UNIT.',
    totalLabel: 'TOTAL',
    vatLabel: 'Impostos',
    totalDueLabel: 'Total a Pagar',
    contactLabel: 'Contato:',
    noteLabel: 'Observação',
    pageOf: 'PÁGINA 1 DE 1',
    disclaimer: 'A responsabilidade por garantir a conformidade e validade é do emitente da fatura.',
    billFromPlaceholder: 'Nome da sua empresa',
    billToPlaceholder: 'Nome do cliente ou empresa',
    contactPlaceholder: '+55 11 90000-0000',
    noteItems: '- Valor do contrato\n- Aulas de inglês\n- Despesas de saúde',
    refPlaceholder: 'ex. a2bbb9c8-ce9e-4798-bdd8-25453930b2ad',
    streetPlaceholder: 'Rua Principal, 123',
  },
  es: {
    appName: 'Generador de Facturas',
    language: 'Idioma',
    clear: 'Limpiar',
    preview: 'Vista previa',
    printSave: 'Imprimir / Guardar PDF',
    savedAt: (time: string) => `Guardado ${time}`,
    invoiceDetails: 'Detalles de la Factura',
    billFromCard: 'De (Tú)',
    billToCard: 'Para (Cliente)',
    taxDetailsCard: 'Datos Fiscales (Opcional)',
    lineItems: 'Líneas de Factura',
    footerDetails: 'Pie de Página',
    invoiceNum: 'Nº de Factura',
    statusField: 'Estado',
    invoiceDateField: 'Fecha de Factura',
    currencyField: 'Moneda',
    pending: 'Pendiente',
    paid: 'Pagado',
    overdue: 'Vencido',
    draft: 'Borrador',
    companyName: 'Empresa / Nombre',
    streetAddress: 'Dirección',
    city: 'Ciudad',
    zip: 'Código Postal',
    country: 'País',
    taxInfo: 'Información Fiscal',
    taxPlaceholder: 'ej. NIF, CIF, número de IVA…',
    descriptionCol: 'Descripción',
    qtyCol: 'Cant.',
    unitCol: 'Unidad',
    rateCol: 'Precio Unit.',
    addLineItem: 'Agregar Línea',
    subtotal: 'Subtotal',
    vatPct: 'IVA (%)',
    totalDue: 'Total a Pagar',
    contactField: 'Contacto',
    notesField: 'Notas',
    referenceId: 'ID de Referencia',
    previewInvoice: 'Vista Previa',
    printSaveAs: 'Imprimir / Guardar como PDF',
    invoicePreview: 'Vista Previa de Factura',
    previewSubtitle: 'Así se verá tu factura al imprimirla',
    printBtn: 'Imprimir',
    invoiceLabel: 'F A C T U R A',
    billToLabel: 'Facturar a:',
    billFromLabel: 'Facturado por:',
    taxDetailsLabel: 'Datos Fiscales:',
    invoiceNumLabel: 'Nº',
    statusLabel: 'Estado',
    invoiceDateLabel: 'Fecha de factura',
    totalAmountLabel: 'Importe total',
    descLabel: 'DESCRIPCIÓN',
    qtyUnitLabel: 'CANT. (UNID.)',
    rateLabel: 'PRECIO UNIT.',
    totalLabel: 'TOTAL',
    vatLabel: 'IVA',
    totalDueLabel: 'Total a Pagar',
    contactLabel: 'Contacto:',
    noteLabel: 'Nota',
    pageOf: 'PÁGINA 1 DE 1',
    disclaimer: 'La responsabilidad de garantizar el cumplimiento y la validez recae en la parte facturadora.',
    billFromPlaceholder: 'Nombre de tu empresa',
    billToPlaceholder: 'Nombre del cliente o empresa',
    contactPlaceholder: '+34 600 000 000',
    noteItems: '- Valor del contrato\n- Clases de inglés\n- Gastos de salud',
    refPlaceholder: 'ej. a2bbb9c8-ce9e-4798-bdd8-25453930b2ad',
    streetPlaceholder: 'Calle Principal, 123',
  },
  fr: {
    appName: 'Générateur de Factures',
    language: 'Langue',
    clear: 'Effacer',
    preview: 'Aperçu',
    printSave: 'Imprimer / Enregistrer PDF',
    savedAt: (time: string) => `Enregistré à ${time}`,
    invoiceDetails: 'Détails de la Facture',
    billFromCard: 'De (Vous)',
    billToCard: 'À (Client)',
    taxDetailsCard: 'Données Fiscales (Optionnel)',
    lineItems: 'Lignes de Facture',
    footerDetails: 'Pied de Page',
    invoiceNum: 'N° de Facture',
    statusField: 'Statut',
    invoiceDateField: 'Date de Facture',
    currencyField: 'Devise',
    pending: 'En attente',
    paid: 'Payé',
    overdue: 'En retard',
    draft: 'Brouillon',
    companyName: 'Société / Nom',
    streetAddress: 'Adresse',
    city: 'Ville',
    zip: 'Code Postal',
    country: 'Pays',
    taxInfo: 'Informations Fiscales',
    taxPlaceholder: 'ex. numéro TVA, SIRET…',
    descriptionCol: 'Description',
    qtyCol: 'Qté',
    unitCol: 'Unité',
    rateCol: 'Prix Unit.',
    addLineItem: 'Ajouter une Ligne',
    subtotal: 'Sous-total',
    vatPct: 'TVA (%)',
    totalDue: 'Total à Payer',
    contactField: 'Contact',
    notesField: 'Notes',
    referenceId: 'Référence',
    previewInvoice: 'Aperçu de la Facture',
    printSaveAs: 'Imprimer / Enregistrer en PDF',
    invoicePreview: 'Aperçu de la Facture',
    previewSubtitle: "Voici à quoi ressemblera votre facture à l'impression",
    printBtn: 'Imprimer',
    invoiceLabel: 'F A C T U R E',
    billToLabel: 'Facturer à :',
    billFromLabel: 'Facturé par :',
    taxDetailsLabel: 'Données Fiscales :',
    invoiceNumLabel: 'N°',
    statusLabel: 'Statut',
    invoiceDateLabel: 'Date de facture',
    totalAmountLabel: 'Montant total',
    descLabel: 'DESCRIPTION',
    qtyUnitLabel: 'QTÉ (UNITÉ)',
    rateLabel: 'PRIX UNIT.',
    totalLabel: 'TOTAL',
    vatLabel: 'TVA',
    totalDueLabel: 'Total à Payer',
    contactLabel: 'Contact :',
    noteLabel: 'Note',
    pageOf: 'PAGE 1 SUR 1',
    disclaimer: "La responsabilité de garantir la conformité et la validité incombe à la partie qui facture.",
    billFromPlaceholder: 'Nom de votre société',
    billToPlaceholder: 'Nom du client ou société',
    contactPlaceholder: '+33 6 00 00 00 00',
    noteItems: '- Valeur du contrat\n- Cours d\'anglais\n- Frais de santé',
    refPlaceholder: 'ex. a2bbb9c8-ce9e-4798-bdd8-25453930b2ad',
    streetPlaceholder: '1 Rue Principale',
  },
  de: {
    appName: 'Rechnungsgenerator',
    language: 'Sprache',
    clear: 'Löschen',
    preview: 'Vorschau',
    printSave: 'Drucken / PDF speichern',
    savedAt: (time: string) => `Gespeichert ${time}`,
    invoiceDetails: 'Rechnungsdetails',
    billFromCard: 'Von (Sie)',
    billToCard: 'An (Kunde)',
    taxDetailsCard: 'Steuerdetails (Optional)',
    lineItems: 'Positionen',
    footerDetails: 'Fußzeile',
    invoiceNum: 'Rechnungs-Nr.',
    statusField: 'Status',
    invoiceDateField: 'Rechnungsdatum',
    currencyField: 'Währung',
    pending: 'Ausstehend',
    paid: 'Bezahlt',
    overdue: 'Überfällig',
    draft: 'Entwurf',
    companyName: 'Firma / Name',
    streetAddress: 'Straße und Hausnummer',
    city: 'Stadt',
    zip: 'PLZ',
    country: 'Land',
    taxInfo: 'Steuerinformationen',
    taxPlaceholder: 'z.B. USt-ID, Steuernummer…',
    descriptionCol: 'Beschreibung',
    qtyCol: 'Menge',
    unitCol: 'Einheit',
    rateCol: 'Einzelpreis',
    addLineItem: 'Position hinzufügen',
    subtotal: 'Zwischensumme',
    vatPct: 'MwSt. (%)',
    totalDue: 'Gesamtbetrag',
    contactField: 'Kontakt',
    notesField: 'Notizen',
    referenceId: 'Referenz-ID',
    previewInvoice: 'Vorschau',
    printSaveAs: 'Drucken / Als PDF speichern',
    invoicePreview: 'Rechnungsvorschau',
    previewSubtitle: 'So sieht Ihre Rechnung beim Drucken aus',
    printBtn: 'Drucken',
    invoiceLabel: 'R E C H N U N G',
    billToLabel: 'Rechnung an:',
    billFromLabel: 'Rechnung von:',
    taxDetailsLabel: 'Steuerdetails:',
    invoiceNumLabel: 'Nr.',
    statusLabel: 'Status',
    invoiceDateLabel: 'Rechnungsdatum',
    totalAmountLabel: 'Gesamtbetrag',
    descLabel: 'BESCHREIBUNG',
    qtyUnitLabel: 'MENGE (EINHEIT)',
    rateLabel: 'EINZELPREIS',
    totalLabel: 'GESAMT',
    vatLabel: 'MwSt.',
    totalDueLabel: 'Gesamtbetrag',
    contactLabel: 'Kontakt:',
    noteLabel: 'Notiz',
    pageOf: 'SEITE 1 VON 1',
    disclaimer: 'Die Verantwortung für die Einhaltung und Gültigkeit liegt beim Rechnungssteller.',
    billFromPlaceholder: 'Name Ihres Unternehmens',
    billToPlaceholder: 'Name des Kunden oder Unternehmens',
    contactPlaceholder: '+49 30 000000',
    noteItems: '- Vertragswert\n- Englischunterricht\n- Gesundheitskosten',
    refPlaceholder: 'z.B. a2bbb9c8-ce9e-4798-bdd8-25453930b2ad',
    streetPlaceholder: 'Hauptstraße 1',
  },
} as const;

type T = typeof TRANSLATIONS['en'];

const LOCALE_MAP: Record<Language, string> = {
  en: 'en-US',
  pt: 'pt-BR',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
};

const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

// ── Helpers ───────────────────────────────────────────────────────────
function formatMoney(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const STATUS_COLORS: Record<Status, string> = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  overdue: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  draft: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

// ── Persistence keys ──────────────────────────────────────────────────
const STORAGE_KEY = 'invoice-generator-draft';
const LANG_STORAGE_KEY = 'invoice-generator-language';

// ── Load saved data from localStorage (client-side only) ──────────────
function loadSaved(): InvoiceData {
  if (typeof window === 'undefined') return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    const saved = JSON.parse(raw) as Partial<InvoiceData>;
    return { ...DEFAULT_DATA, ...saved };
  } catch {
    return DEFAULT_DATA;
  }
}

// ── Default data ───────────────────────────────────────────────────────
const DEFAULT_DATA: InvoiceData = {
  invoiceNumber: 'EINV-2026-10',
  status: 'pending',
  invoiceDate: new Date().toISOString().split('T')[0],
  currency: 'USD',
  billToName: '',
  billToAddress: '',
  billToCity: '',
  billToZip: '',
  billToCountry: '',
  billFromName: '',
  billFromAddress: '',
  billFromCity: '',
  billFromZip: '',
  billFromCountry: '',
  taxDetails: '',
  items: [{ id: '1', description: '', qty: 1, unit: 'items', rate: 0 }],
  vatRate: 0,
  contact: '',
  notes: '',
  reference: '',
};

// ── Shared class strings ──────────────────────────────────────────────
const inp =
  'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm';
const lbl =
  'block text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1';

// ── Section card ──────────────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ── Address block helper ──────────────────────────────────────────────
function AddressFields({
  prefix,
  data,
  onChange,
  placeholder,
  t,
}: {
  prefix: 'billFrom' | 'billTo';
  data: InvoiceData;
  onChange: (field: keyof InvoiceData, value: string) => void;
  placeholder: string;
  t: T;
}) {
  const f = (suffix: string) => `${prefix}${suffix}` as keyof InvoiceData;
  return (
    <div className="space-y-3">
      <div>
        <label className={lbl}>{t.companyName}</label>
        <input className={inp} value={data[f('Name')] as string} onChange={(e) => onChange(f('Name'), e.target.value)} placeholder={placeholder} />
      </div>
      <div>
        <label className={lbl}>{t.streetAddress}</label>
        <input className={inp} value={data[f('Address')] as string} onChange={(e) => onChange(f('Address'), e.target.value)} placeholder={t.streetPlaceholder} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>{t.city}</label>
          <input className={inp} value={data[f('City')] as string} onChange={(e) => onChange(f('City'), e.target.value)} placeholder={t.city} />
        </div>
        <div>
          <label className={lbl}>{t.zip}</label>
          <input className={inp} value={data[f('Zip')] as string} onChange={(e) => onChange(f('Zip'), e.target.value)} placeholder="00000" />
        </div>
      </div>
      <div>
        <label className={lbl}>{t.country}</label>
        <input className={inp} value={data[f('Country')] as string} onChange={(e) => onChange(f('Country'), e.target.value)} placeholder={t.country} />
      </div>
    </div>
  );
}

// ── Invoice content shared between print + preview ────────────────────
function InvoiceContent({ data, t, locale }: { data: InvoiceData; t: T; locale: string }) {
  const subtotal = data.items.reduce((s, i) => s + i.qty * i.rate, 0);
  const vat = subtotal * (data.vatRate / 100);
  const total = subtotal + vat;

  return (
    <div
      style={{
        padding: '48px 56px',
        minHeight: '297mm',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '13px',
        color: '#111',
        fontFamily: 'Arial, Helvetica, sans-serif',
        background: 'white',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Top header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          {data.billFromName || 'Your Company'}
        </h1>
        <div style={{ background: '#f0f0f0', padding: '8px 22px', letterSpacing: '5px', fontSize: '11px', fontWeight: '600', color: '#444' }}>
          {t.invoiceLabel}
        </div>
      </div>

      {/* ── Bill To + Invoice meta ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px', margin: '0 0 8px' }}>{t.billToLabel}</p>
          {[data.billToName, data.billToAddress, data.billToCity, data.billToZip, data.billToCountry]
            .filter(Boolean)
            .map((line, i) => (
              <p key={i} style={{ margin: '0 0 2px', fontSize: '12px' }}>{line}</p>
            ))}
        </div>
        <div style={{ textAlign: 'right' }}>
          <table style={{ marginLeft: 'auto', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ color: '#777', paddingRight: '16px', paddingBottom: '4px', fontSize: '12px' }}>{t.invoiceNumLabel}</td>
                <td style={{ fontSize: '12px', paddingBottom: '4px' }}>{data.invoiceNumber}</td>
              </tr>
              <tr>
                <td style={{ color: '#777', paddingRight: '16px', paddingBottom: '4px', fontSize: '12px' }}>{t.statusLabel}</td>
                <td style={{ fontSize: '12px', paddingBottom: '4px' }}>{data.status}</td>
              </tr>
              <tr>
                <td style={{ color: '#777', paddingRight: '16px', paddingBottom: '4px', fontSize: '12px' }}>{t.invoiceDateLabel}</td>
                <td style={{ fontSize: '12px', paddingBottom: '4px' }}>{formatDate(data.invoiceDate, locale)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', paddingRight: '16px', fontSize: '12px' }}>{t.totalAmountLabel}</td>
                <td style={{ fontWeight: 'bold', fontSize: '12px' }}>{formatMoney(total, data.currency)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bill From + Tax Details ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px', margin: '0 0 8px' }}>{t.billFromLabel}</p>
          {[data.billFromName, data.billFromAddress, data.billFromCity, data.billFromZip, data.billFromCountry]
            .filter(Boolean)
            .map((line, i) => (
              <p key={i} style={{ margin: '0 0 2px', fontSize: '12px' }}>{line}</p>
            ))}
        </div>
        <div>
          <p style={{ color: '#888', marginBottom: '8px', fontSize: '12px', margin: '0 0 8px' }}>{t.taxDetailsLabel}</p>
          {data.taxDetails && <p style={{ margin: 0, fontSize: '12px' }}>{data.taxDetails}</p>}
        </div>
      </div>

      {/* ── Items table ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#111', color: '#fff' }}>
            {[
              { label: t.descLabel, align: 'left' as const },
              { label: t.qtyUnitLabel, align: 'center' as const },
              { label: t.rateLabel, align: 'right' as const },
              { label: t.totalLabel, align: 'right' as const },
            ].map(({ label, align }) => (
              <th key={label} style={{ padding: '11px 14px', textAlign: align, fontSize: '10px', fontWeight: '700', letterSpacing: '1px' }}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px 14px', fontWeight: '600', fontSize: '12px' }}>{item.description}</td>
              <td style={{ padding: '12px 14px', textAlign: 'center', fontSize: '12px' }}>{item.qty} ({item.unit})</td>
              <td style={{ padding: '12px 14px', textAlign: 'right', fontSize: '12px' }}>{formatMoney(item.rate, data.currency)}</td>
              <td style={{ padding: '12px 14px', textAlign: 'right', fontSize: '12px' }}>{formatMoney(item.qty * item.rate, data.currency)}</td>
            </tr>
          ))}
          {/* VAT row */}
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td colSpan={2} style={{ padding: '10px 14px' }} />
            <td style={{ padding: '10px 14px', textAlign: 'right', color: '#777', fontSize: '12px' }}>{t.vatLabel}</td>
            <td style={{ padding: '10px 14px', textAlign: 'right', fontSize: '12px' }}>{formatMoney(vat, data.currency)}</td>
          </tr>
          {/* Total Due row */}
          <tr style={{ borderBottom: '2px solid #111' }}>
            <td colSpan={2} style={{ padding: '10px 14px' }} />
            <td style={{ padding: '10px 14px', textAlign: 'right', color: '#777', fontSize: '12px' }}>{t.totalDueLabel}</td>
            <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 'bold', fontSize: '12px' }}>{formatMoney(total, data.currency)}</td>
          </tr>
        </tbody>
      </table>

      {/* ── Spacer ── */}
      <div style={{ flex: 1, minHeight: '60px' }} />

      {/* ── Footer ── */}
      <div style={{ marginTop: '48px' }}>
        {/* Contact + Signature */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
          <div>
            {data.contact && (
              <p style={{ margin: 0, fontSize: '12px' }}>
                <strong>{t.contactLabel}</strong> {data.contact}
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '30px', fontWeight: '700', margin: 0, lineHeight: 1 }}>
              {data.billFromName || 'Your Company'}
            </p>
          </div>
        </div>

        {/* Notes */}
        {data.notes && (
          <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', fontSize: '12px' }}>
            <strong style={{ whiteSpace: 'nowrap' }}>{t.noteLabel}</strong>
            <div style={{ whiteSpace: 'pre-line' }}>{data.notes}</div>
          </div>
        )}

        {/* Reference + Page number */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e0e0e0', paddingTop: '12px', fontSize: '10px', color: '#555' }}>
          {data.reference ? <span>REF: {data.reference}</span> : <span />}
          <span>{t.pageOf}</span>
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: '9px', color: '#aaa', margin: '6px 0 0' }}>
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function InvoicePage() {
  const [data, setData] = useState<InvoiceData>(DEFAULT_DATA);
  const [hydrated, setHydrated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Step 1 — after mount, load saved data and language
  useEffect(() => {
    setData(loadSaved());
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
    if (savedLang && savedLang in TRANSLATIONS) setLanguage(savedLang);
    setHydrated(true);
  }, []);

  // Step 2 — auto-save on every change
  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch {
        // localStorage unavailable — fail silently
      }
    }, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [data, hydrated]);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch { /* ignore */ }
  }, []);

  const clearSaved = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData({ ...DEFAULT_DATA, invoiceDate: new Date().toISOString().split('T')[0] });
    setSavedAt(null);
  }, []);

  const update = useCallback(<K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateItem = useCallback(<K extends keyof LineItem>(id: string, field: K, value: LineItem[K]) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  }, []);

  const addItem = useCallback(() => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), description: '', qty: 1, unit: 'items', rate: 0 }],
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setData((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== id) }));
  }, []);

  const subtotal = data.items.reduce((s, i) => s + i.qty * i.rate, 0);
  const vat = subtotal * (data.vatRate / 100);
  const total = subtotal + vat;

  const t = TRANSLATIONS[language];
  const locale = LOCALE_MAP[language];

  return (
    <>
      {/* ── Print layout — always rendered, only shows when printing ── */}
      <div className="print-only" style={{ width: '210mm' }}>
        <InvoiceContent data={data} t={t} locale={locale} />
      </div>

      {/* ── App UI ── */}
      <div className="no-print min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">

        {/* Sticky header */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-none">{t.appName}</h1>
                <p className="text-[11px] text-gray-400 mt-0.5">{data.invoiceNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Auto-saved indicator */}
              {savedAt && (
                <span className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.savedAt(savedAt)}
                </span>
              )}

              {/* Language selector */}
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value as Language)}
                  className="bg-transparent focus:outline-none text-sm text-gray-600 dark:text-gray-300 cursor-pointer pr-1"
                  title={t.language}
                >
                  {(Object.keys(LANGUAGE_NAMES) as Language[]).map((lang) => (
                    <option key={lang} value={lang}>{LANGUAGE_NAMES[lang]}</option>
                  ))}
                </select>
              </div>

              {/* Clear form */}
              <button
                onClick={clearSaved}
                title="Clear all fields and start fresh"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {t.clear}
              </button>
              {/* Preview */}
              <button
                onClick={() => setShowPreview(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {t.preview}
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 012-2h6a2 2 0 012 2v2" />
                </svg>
                <span className="hidden sm:inline">{t.printSave}</span>
                <span className="sm:hidden">{t.printBtn}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Form body */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">

          {/* ── Invoice Details ── */}
          <Card title={t.invoiceDetails}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className={lbl}>{t.invoiceNum}</label>
                <input className={inp} value={data.invoiceNumber} onChange={(e) => update('invoiceNumber', e.target.value)} placeholder="EINV-2026-01" />
              </div>
              <div>
                <label className={lbl}>{t.statusField}</label>
                <select className={inp} value={data.status} onChange={(e) => update('status', e.target.value as Status)}>
                  <option value="pending">{t.pending}</option>
                  <option value="paid">{t.paid}</option>
                  <option value="overdue">{t.overdue}</option>
                  <option value="draft">{t.draft}</option>
                </select>
              </div>
              <div>
                <label className={lbl}>{t.invoiceDateField}</label>
                <input type="date" className={inp} value={data.invoiceDate} onChange={(e) => update('invoiceDate', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>{t.currencyField}</label>
                <select className={inp} value={data.currency} onChange={(e) => update('currency', e.target.value)}>
                  <option value="USD">USD – US Dollar</option>
                  <option value="EUR">EUR – Euro</option>
                  <option value="GBP">GBP – British Pound</option>
                  <option value="BRL">BRL – Brazilian Real</option>
                  <option value="CAD">CAD – Canadian Dollar</option>
                  <option value="AUD">AUD – Australian Dollar</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-gray-400 dark:text-gray-500">{t.statusField}:</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${STATUS_COLORS[data.status]}`}>
                {t[data.status as keyof T] as string}
              </span>
            </div>
          </Card>

          {/* ── Addresses ── */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Card title={t.billFromCard}>
              <AddressFields prefix="billFrom" data={data} onChange={(f, v) => update(f, v)} placeholder={t.billFromPlaceholder} t={t} />
            </Card>
            <Card title={t.billToCard}>
              <AddressFields prefix="billTo" data={data} onChange={(f, v) => update(f, v)} placeholder={t.billToPlaceholder} t={t} />
            </Card>
          </div>

          {/* ── Tax Details ── */}
          <Card title={t.taxDetailsCard}>
            <div>
              <label className={lbl}>{t.taxInfo}</label>
              <input className={inp} value={data.taxDetails} onChange={(e) => update('taxDetails', e.target.value)} placeholder={t.taxPlaceholder} />
            </div>
          </Card>

          {/* ── Line Items ── */}
          <Card title={t.lineItems}>
            {/* Column headers — desktop */}
            <div className="hidden md:grid grid-cols-12 gap-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 px-1">
              <div className="col-span-5">{t.descriptionCol}</div>
              <div className="col-span-2">{t.qtyCol}</div>
              <div className="col-span-2">{t.unitCol}</div>
              <div className="col-span-2 text-right">{t.rateCol}</div>
              <div className="col-span-1" />
            </div>

            <div className="space-y-3">
              {data.items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-start bg-gray-50 dark:bg-gray-800/40 rounded-xl p-3">
                  <div className="col-span-12 md:col-span-5">
                    <label className="md:hidden block mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">{t.descriptionCol}</label>
                    <input className={inp} value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} placeholder="Service or product description" />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <label className="md:hidden block mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">{t.qtyCol}</label>
                    <input type="number" className={inp} value={item.qty} min={0} onChange={(e) => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)} placeholder="1" />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <label className="md:hidden block mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">{t.unitCol}</label>
                    <input className={inp} value={item.unit} onChange={(e) => updateItem(item.id, 'unit', e.target.value)} placeholder="items" />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <label className="md:hidden block mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">{t.rateCol}</label>
                    <input type="number" className={`${inp} text-right`} value={item.rate} min={0} step={0.01} onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)} placeholder="0.00" />
                  </div>
                  <div className="col-span-1 flex items-center justify-center pt-1 md:pt-0">
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={data.items.length === 1}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {/* Line total */}
                  <div className="col-span-12 flex justify-end items-center gap-1 px-1">
                    <span className="text-xs text-gray-400 dark:text-gray-500">= </span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                      {formatMoney(item.qty * item.rate, data.currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add item */}
            <button onClick={addItem} className="mt-4 flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t.addLineItem}
            </button>

            {/* Totals */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
              <div className="ml-auto max-w-xs space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{t.subtotal}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200">{formatMoney(subtotal, data.currency)}</span>
                </div>
                <div className="flex justify-between items-center text-sm gap-4">
                  <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">{t.vatPct}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-16 px-2 py-1.5 text-sm text-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.vatRate}
                      min={0}
                      max={100}
                      step={0.1}
                      onChange={(e) => update('vatRate', parseFloat(e.target.value) || 0)}
                    />
                    <span className="font-medium text-gray-700 dark:text-gray-200 w-28 text-right">{formatMoney(vat, data.currency)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-bold text-gray-900 dark:text-white">{t.totalDue}</span>
                  <span className="font-bold text-xl text-blue-600 dark:text-blue-400">{formatMoney(total, data.currency)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* ── Footer Details ── */}
          <Card title={t.footerDetails}>
            <div className="space-y-4">
              <div>
                <label className={lbl}>{t.contactField}</label>
                <input className={inp} value={data.contact} onChange={(e) => update('contact', e.target.value)} placeholder={t.contactPlaceholder} />
              </div>
              <div>
                <label className={lbl}>{t.notesField}</label>
                <textarea
                  className={`${inp} resize-none`}
                  rows={4}
                  value={data.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  placeholder={t.noteItems}
                />
              </div>
              <div>
                <label className={lbl}>{t.referenceId}</label>
                <input className={inp} value={data.reference} onChange={(e) => update('reference', e.target.value)} placeholder={t.refPlaceholder} />
              </div>
            </div>
          </Card>

          {/* ── Bottom actions ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pb-10">
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {t.previewInvoice}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 012-2h6a2 2 0 012 2v2" />
              </svg>
              {t.printSaveAs}
            </button>
          </div>
        </main>
      </div>

      {/* ── Preview Modal ── */}
      {showPreview && (
        <div
          className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t.invoicePreview}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{t.previewSubtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowPreview(false); setTimeout(() => window.print(), 150); }}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 012-2h6a2 2 0 012 2v2" />
                  </svg>
                  {t.printBtn}
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scaled invoice preview */}
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-b-2xl overflow-auto">
              <div className="origin-top-left" style={{ transform: 'scale(0.72)', width: '138.9%', transformOrigin: 'top left' }}>
                <div className="shadow-xl rounded overflow-hidden">
                  <InvoiceContent data={data} t={t} locale={locale} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
