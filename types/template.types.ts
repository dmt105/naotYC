/**
 * Template types and interfaces
 */

export interface Template {
  id: string;
  name: string;
  description?: string;
  type: string;
  content: string;
  variables: string[]; // e.g., ['{author}', '{date}', '{recipient}']
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateDto {
  name: string;
  description?: string;
  type: string;
  content: string;
  variables?: string[];
}

export interface UpdateTemplateDto extends Partial<CreateTemplateDto> {
  id: string;
}





