
import { Department } from "@/lib/types";

export const initialDepartments: Department[] = [
  {
    id: "1",
    name: "SECOM",
    description: "Secretaria de Comunicação",
    contactEmail: "contato@secom.gov.br",
    contactPhone: "(11) 3333-4444",
    active: true
  },
  {
    id: "2",
    name: "DETRAN",
    description: "Departamento Estadual de Trânsito",
    contactEmail: "atendimento@detran.gov.br",
    contactPhone: "(11) 2222-3333",
    active: true
  },
  {
    id: "3",
    name: "Secretaria de Esporte",
    description: "Secretaria Estadual de Esporte",
    contactEmail: "esporte@governo.gov.br",
    contactPhone: "(11) 5555-6666",
    active: true
  },
  {
    id: "4",
    name: "IMA",
    description: "Instituto do Meio Ambiente",
    contactEmail: "contato@ima.gov.br",
    contactPhone: "(11) 7777-8888",
    active: true
  },
  {
    id: "5",
    name: "Secretaria de Cultura",
    description: "Secretaria Estadual de Cultura",
    contactEmail: "cultura@governo.gov.br",
    contactPhone: "(11) 9999-0000",
    active: true
  }
];

export const emptyDepartment: Omit<Department, 'id' | 'active'> = {
  name: "",
  description: "",
  contactEmail: "",
  contactPhone: ""
};
