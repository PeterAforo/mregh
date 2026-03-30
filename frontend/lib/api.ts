import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('mre_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProjects = (published?: boolean) =>
  api.get('/projects', { params: published !== undefined ? { published } : {} }).then(r => r.data);

export const getFeaturedProjects = () =>
  api.get('/projects/featured').then(r => r.data);

export const getProjectBySlug = (slug: string) =>
  api.get(`/projects/${slug}`).then(r => r.data);

export const getServices = (published?: boolean) =>
  api.get('/services', { params: published !== undefined ? { published } : {} }).then(r => r.data);

export const getServiceBySlug = (slug: string) =>
  api.get(`/services/${slug}`).then(r => r.data);

export const getTeam = (published?: boolean) =>
  api.get('/team', { params: published !== undefined ? { published } : {} }).then(r => r.data);

export const getBlogPosts = (published?: boolean) =>
  api.get('/blog', { params: published !== undefined ? { published } : {} }).then(r => r.data);

export const getBlogPostBySlug = (slug: string) =>
  api.get(`/blog/${slug}`).then(r => r.data);

export const getTestimonials = (published?: boolean) =>
  api.get('/testimonials', { params: published !== undefined ? { published } : {} }).then(r => r.data);

export const getHeroSlides = (published?: boolean) =>
  api.get('/hero', { params: published !== undefined ? { published } : {} }).then(r => r.data);

export const submitContact = (data: any) =>
  api.post('/contact', data).then(r => r.data);

export const getContactMessages = () =>
  api.get('/contact').then(r => r.data);

export const getSetting = (key: string) =>
  api.get(`/settings/${key}`).then(r => r.data);

export const getSettingsByGroup = (group: string) =>
  api.get(`/settings/group/${group}`).then(r => r.data);

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password }).then(r => r.data);

export const getProfile = () =>
  api.get('/auth/profile').then(r => r.data);

export const adminApi = {
  getProjects: () => api.get('/projects?published=false').then(r => r.data),
  createProject: (data: any) => api.post('/projects', data).then(r => r.data),
  updateProject: (id: number, data: any) => api.put(`/projects/${id}`, data).then(r => r.data),
  deleteProject: (id: number) => api.delete(`/projects/${id}`).then(r => r.data),

  getServices: () => api.get('/services').then(r => r.data),
  createService: (data: any) => api.post('/services', data).then(r => r.data),
  updateService: (id: number, data: any) => api.put(`/services/${id}`, data).then(r => r.data),
  deleteService: (id: number) => api.delete(`/services/${id}`).then(r => r.data),

  getTeam: () => api.get('/team').then(r => r.data),
  createTeamMember: (data: any) => api.post('/team', data).then(r => r.data),
  updateTeamMember: (id: number, data: any) => api.put(`/team/${id}`, data).then(r => r.data),
  deleteTeamMember: (id: number) => api.delete(`/team/${id}`).then(r => r.data),

  getBlogPosts: () => api.get('/blog').then(r => r.data),
  createBlogPost: (data: any) => api.post('/blog', data).then(r => r.data),
  updateBlogPost: (id: number, data: any) => api.put(`/blog/${id}`, data).then(r => r.data),
  deleteBlogPost: (id: number) => api.delete(`/blog/${id}`).then(r => r.data),

  getTestimonials: () => api.get('/testimonials').then(r => r.data),
  createTestimonial: (data: any) => api.post('/testimonials', data).then(r => r.data),
  updateTestimonial: (id: number, data: any) => api.put(`/testimonials/${id}`, data).then(r => r.data),
  deleteTestimonial: (id: number) => api.delete(`/testimonials/${id}`).then(r => r.data),

  getHeroSlides: () => api.get('/hero').then(r => r.data),
  createHeroSlide: (data: any) => api.post('/hero', data).then(r => r.data),
  updateHeroSlide: (id: number, data: any) => api.put(`/hero/${id}`, data).then(r => r.data),
  deleteHeroSlide: (id: number) => api.delete(`/hero/${id}`).then(r => r.data),

  getMessages: () => api.get('/contact').then(r => r.data),
  getMessageStats: () => api.get('/contact/stats').then(r => r.data),
  markMessageRead: (id: number) => api.put(`/contact/${id}/read`).then(r => r.data),
  deleteMessage: (id: number) => api.delete(`/contact/${id}`).then(r => r.data),

  getSettings: () => api.get('/settings').then(r => r.data),
  saveSettings: (settings: any[]) => api.post('/settings/bulk', { settings }).then(r => r.data),

  uploadFile: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
  },
  getMedia: () => api.get('/upload').then(r => r.data),
  deleteMedia: (id: number) => api.delete(`/upload/${id}`).then(r => r.data),
};
