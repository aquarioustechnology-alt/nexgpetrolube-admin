// Mock data for masters
export const mastersMock = {
  categories: [
    {
      id: 'CAT001',
      name: 'Engine Oils',
      subCategories: 8,
      products: 156,
      active: true,
    },
    {
      id: 'CAT002',
      name: 'Gear Oils',
      subCategories: 6,
      products: 89,
      active: true,
    },
    {
      id: 'CAT003',
      name: 'Brake Fluids',
      subCategories: 4,
      products: 67,
      active: true,
    },
  ],
  subcategories: [
    {
      id: 'SUB001',
      name: 'Synthetic',
      category: 'Engine Oils',
      products: 45,
      active: true,
    },
    {
      id: 'SUB002',
      name: 'Mineral',
      category: 'Engine Oils',
      products: 38,
      active: true,
    },
    {
      id: 'SUB003',
      name: 'Semi-Synthetic',
      category: 'Engine Oils',
      products: 42,
      active: true,
    },
  ],
  brands: [
    {
      id: 'BRD001',
      name: 'Castrol',
      products: 45,
      categories: 6,
      active: true,
    },
    { id: 'BRD002', name: 'Mobil', products: 38, categories: 5, active: true },
    { id: 'BRD003', name: 'Shell', products: 42, categories: 7, active: true },
  ],
  units: [
    { id: 'UNT001', name: 'Liters', symbol: 'L', active: true },
    { id: 'UNT002', name: 'Kilograms', symbol: 'kg', active: true },
    { id: 'UNT003', name: 'Pieces', symbol: 'pcs', active: true },
  ],
}
