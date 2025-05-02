/**
 * TypeScript interfaces for route components
 */
interface RouteSection {
  (): string; 
  new: string;
  path: (subPath: string) => string;
  action: (action: string, id?: string) => string;
  [key: string]: any; 
}

interface Routes {
  dashboard: string;
  login: string;
  patients: RouteSection;
  appointments: RouteSection;
  staff: RouteSection;
  records: RouteSection;
  pharmacy: RouteSection & {
    medications: RouteSection;
    inventory: RouteSection;
  };
  billing: RouteSection & {
    invoices: RouteSection;
    payments: RouteSection;
    insurance: RouteSection;
  };
  reports: RouteSection;
  settings: RouteSection;
}

/**
 * Enhanced component routing hook that provides consistent path generation
 * with better structure and maintainability
 */
const useComponentRoute = (): Routes => {
  
  const BASE_PATH = '/dashboard';
  
  
  const createSection = (sectionPath: string, subsections: string[] = []): RouteSection => {
    const base = `${BASE_PATH}/${sectionPath}`;
    
    
    const sectionFn = () => base;
    
    
    sectionFn.new = `${base}/new`;
    sectionFn.path = (subPath: string) => `${base}/${subPath}`;
    sectionFn.action = (action: string, id: string = '') => 
      id ? `${base}/${id}/${action}` : `${base}/${action}`;
    
    
    if (subsections.length > 0) {
      subsections.forEach(subsection => {
        const subsectionBase = `${base}/${subsection}`;
        
        const subsectionFn = () => subsectionBase;
        subsectionFn.new = `${subsectionBase}/new`;
        subsectionFn.path = (subPath: string) => `${subsectionBase}/${subPath}`;
        subsectionFn.action = (action: string, id: string = '') => 
          id ? `${subsectionBase}/${id}/${action}` : `${subsectionBase}/${action}`;
        //@ts-ignore
        sectionFn[subsection] = subsectionFn;
      });
    }
    
    return sectionFn as RouteSection;
  };

  
  return {
    dashboard: BASE_PATH,
    login: '/login',
    patients: createSection('patients'),
    appointments: createSection('appointments'),
    staff: createSection('staff'),
    records: createSection('records'),
    pharmacy: createSection('pharmacy', ['medications', 'inventory']) as RouteSection & {
      medications: RouteSection;
      inventory: RouteSection;
    },
    billing: createSection('billing', ['invoices', 'payments', 'insurance']) as RouteSection & {
      invoices: RouteSection;
      payments: RouteSection;
      insurance: RouteSection;
    },
    reports: createSection('reports'),
    settings: createSection('settings'),
  };
};

export default useComponentRoute;
