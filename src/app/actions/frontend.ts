'use server';

import { submitProjectRequest as _submitProjectRequest } from './frontend/projects';
import { submitContactMessage as _submitContactMessage } from './frontend/contact';
import { submitComment as _submitComment } from './frontend/comments';

export async function submitProjectRequest(formData: FormData) {
  return _submitProjectRequest(formData);
}

export async function submitContactMessage(formData: FormData) {
  return _submitContactMessage(formData);
}

export async function submitComment(formData: FormData) {
  return _submitComment(formData);
}
