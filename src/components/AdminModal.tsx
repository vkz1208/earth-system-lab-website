'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';

export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'boolean' | 'number' | 'list' | 'image';
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
  hint?: string;
  rows?: number;
  /** For type='list': define sub-fields for each list item. If omitted, items are plain strings. */
  itemFields?: FieldDef[];
  /** For type='image': subdirectory under public/images/ to upload to (e.g. 'team', 'papers', 'news') */
  uploadDir?: string;
}

interface AdminModalProps {
  open: boolean;
  title: string;
  fields: FieldDef[];
  data: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
  saving?: boolean;
}

export default function AdminModal({
  open,
  title,
  fields,
  data,
  onChange,
  onSave,
  onCancel,
  saving,
}: AdminModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [uploading, setUploading] = useState<string | null>(null); // field name being uploaded
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Get auth token for upload
  const getAuthToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('admin_token') || '';
    }
    return '';
  }, []);

  const handleImageUpload = useCallback(async (fieldName: string, subdir: string, file: File) => {
    setUploading(fieldName);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subdir', subdir);
      const token = getAuthToken();
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Upload failed');
      onChange(fieldName, json.path);
    } catch (err: any) {
      setUploadError(err.message || '上传失败');
    } finally {
      setUploading(null);
    }
  }, [onChange, getAuthToken]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onCancel();
  };

  // Group fields into two columns when there are bilingual pairs
  const renderField = (field: FieldDef) => {
    const value = data[field.name] ?? (field.type === 'boolean' ? false : '');

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 text-sm border border-neutral-gray rounded-lg bg-white focus:outline-none focus:border-earth-green focus:ring-1 focus:ring-earth-green/20 transition-colors"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value ? Number(e.target.value) : '')}
            className="w-full px-3 py-2 text-sm border border-neutral-gray rounded-lg bg-white focus:outline-none focus:border-earth-green focus:ring-1 focus:ring-earth-green/20 transition-colors"
          />
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className="w-full px-3 py-2 text-sm border border-neutral-gray rounded-lg bg-white focus:outline-none focus:border-earth-green focus:ring-1 focus:ring-earth-green/20 transition-colors resize-y"
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full px-3 py-2 text-sm border border-neutral-gray rounded-lg bg-white focus:outline-none focus:border-earth-green focus:ring-1 focus:ring-earth-green/20 transition-colors"
          >
            <option value="">— 请选择 —</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case 'boolean':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="w-4 h-4 rounded border-neutral-gray text-earth-green focus:ring-earth-green/20"
            />
            <span className="text-sm text-neutral-text-secondary">{field.hint || '是'}</span>
          </label>
        );
      case 'list': {
        const listValue: any[] = Array.isArray(value) ? value : [];
        const isSimpleList = !field.itemFields || field.itemFields.length === 0;

        const handleListAdd = () => {
          if (isSimpleList) {
            onChange(field.name, [...listValue, '']);
          } else {
            const emptyItem: Record<string, any> = {};
            field.itemFields!.forEach((f) => {
              emptyItem[f.name] = f.type === 'boolean' ? false : '';
            });
            onChange(field.name, [...listValue, emptyItem]);
          }
        };

        const handleListRemove = (idx: number) => {
          onChange(field.name, listValue.filter((_: any, i: number) => i !== idx));
        };

        const handleListItemChange = (idx: number, itemValue: any) => {
          const updated = [...listValue];
          updated[idx] = itemValue;
          onChange(field.name, updated);
        };

        const handleListObjFieldChange = (idx: number, fieldName: string, fieldValue: any) => {
          const updated = [...listValue];
          updated[idx] = { ...updated[idx], [fieldName]: fieldValue };
          onChange(field.name, updated);
        };

        return (
          <div className="space-y-2">
            {listValue.map((item: any, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="flex-1">
                  {isSimpleList ? (
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleListItemChange(idx, e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-gray rounded-lg bg-white focus:outline-none focus:border-earth-green focus:ring-1 focus:ring-earth-green/20 transition-colors"
                    />
                  ) : (
                    <div className="space-y-2 p-3 border border-neutral-gray/60 rounded-lg bg-neutral-bg/30">
                      {field.itemFields!.map((subField) => (
                        <div key={subField.name}>
                          <label className="block text-xs font-normal text-neutral-text-secondary mb-1">
                            {subField.label}
                          </label>
                          {subField.type === 'text' ? (
                            <input
                              type="text"
                              value={item[subField.name] ?? ''}
                              onChange={(e) => handleListObjFieldChange(idx, subField.name, e.target.value)}
                              className="w-full px-2 py-1.5 text-sm border border-neutral-gray rounded-lg bg-white focus:outline-none focus:border-earth-green transition-colors"
                            />
                          ) : subField.type === 'select' ? (
                            <select
                              value={item[subField.name] ?? ''}
                              onChange={(e) => handleListObjFieldChange(idx, subField.name, e.target.value)}
                              className="w-full px-2 py-1.5 text-sm border border-neutral-gray rounded-lg bg-white focus:outline-none focus:border-earth-green transition-colors"
                            >
                              <option value="">—</option>
                              {subField.options?.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleListRemove(idx)}
                  className="mt-1 p-1 text-neutral-text-secondary hover:text-red-400 transition-colors"
                  title="删除此项"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleListAdd}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-earth-green-deep border border-dashed border-earth-green-soft/40 rounded-lg hover:border-earth-green-soft hover:bg-earth-green-glow/20 transition-all"
            >
              + 添加
            </button>
          </div>
        );
      }
      case 'image': {
        const imgValue = data[field.name] ?? '';
        const isUploading = uploading === field.name;
        const subdir = field.uploadDir || 'misc';
        return (
          <div className="space-y-2">
            {/* Current image preview */}
            {imgValue && (
              <div className="relative group/img inline-block">
                <div className="w-32 h-32 rounded-card overflow-hidden border border-neutral-gray bg-neutral-bg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgValue}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onChange(field.name, '')}
                  className="absolute -top-1.5 -right-1.5 p-0.5 bg-white rounded-full border border-neutral-gray shadow-sm text-neutral-text-secondary hover:text-red-400 transition-colors"
                  title="移除图片"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            {/* Upload area */}
            <div className="flex items-center gap-3">
              <label
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-earth-green-soft/40 rounded-lg cursor-pointer hover:border-earth-green-soft hover:bg-earth-green-glow/20 transition-all ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-earth-green-deep" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    上传中...
                  </>
                ) : (
                  <>
                    <Upload size={14} className="text-earth-green-deep" />
                    选择图片
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                  className="hidden"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(field.name, subdir, file);
                    e.target.value = '';
                  }}
                />
              </label>
              {!imgValue && (
                <span className="text-xs text-neutral-text-secondary">或手动输入路径</span>
              )}
            </div>
            {/* Manual path input fallback */}
            {!imgValue && (
              <input
                type="text"
                value={imgValue}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder || '/images/xxx.jpg'}
                className="w-full px-3 py-2 text-sm border border-neutral-gray rounded-lg bg-white focus:outline-none focus:border-earth-green focus:ring-1 focus:ring-earth-green/20 transition-colors"
              />
            )}
            {/* Upload error */}
            {uploadError && uploading === field.name && (
              <p className="text-xs text-red-400">{uploadError}</p>
            )}
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[5vh] pb-[5vh] overflow-y-auto bg-black/40 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-neutral-gray animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-gray">
          <h2 className="text-lg font-normal text-earth-green-deep">{title}</h2>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-neutral-text-secondary hover:text-earth-green-deep hover:bg-neutral-bg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-normal text-neutral-text mb-1.5">
                {field.label}
                {field.required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              {renderField(field)}
              {field.hint && field.type !== 'boolean' && (
                <p className="mt-1 text-xs text-neutral-text-secondary">{field.hint}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-gray bg-neutral-bg/30 rounded-b-2xl">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-neutral-text-secondary hover:text-neutral-text rounded-lg border border-neutral-gray hover:border-neutral-text-secondary/30 transition-colors"
          >
            取消
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-5 py-2 text-sm text-white bg-earth-green-deep rounded-lg hover:bg-earth-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
}
