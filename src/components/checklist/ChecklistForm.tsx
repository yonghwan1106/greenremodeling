'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Building, ChecklistSection, BUILDING_TYPE_LABELS } from '@/types';
import { checklistTemplates } from '@/data/checklist-templates';
import {
  Building2,
  CheckCircle2,
  Camera,
  MessageSquare,
  Download,
  Save,
  ArrowLeft,
} from 'lucide-react';

interface ChecklistFormProps {
  building: Building;
  onBack: () => void;
}

export function ChecklistForm({ building, onBack }: ChecklistFormProps) {
  const template = checklistTemplates.find((t) => t.buildingType === building.type);

  const [sections, setSections] = useState<ChecklistSection[]>(
    template?.sections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        checked: false,
        note: '',
      })),
    })) || []
  );

  const progress = useMemo(() => {
    const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0);
    const checkedItems = sections.reduce(
      (sum, section) => sum + section.items.filter((item) => item.checked).length,
      0
    );
    return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
  }, [sections]);

  const handleCheckItem = (sectionId: string, itemId: string, checked: boolean) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, checked } : item
              ),
            }
          : section
      )
    );
  };

  const handleNoteChange = (sectionId: string, itemId: string, note: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, note } : item
              ),
            }
          : section
      )
    );
  };

  const handleSave = () => {
    // Save to localStorage or API
    const checklistData = {
      buildingId: building.id,
      buildingName: building.name,
      sections,
      progress,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(`checklist-${building.id}`, JSON.stringify(checklistData));
    alert('체크리스트가 저장되었습니다.');
  };

  const handleExport = () => {
    // Generate and download report
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `체크리스트_${building.name}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReport = () => {
    let report = `그린리모델링 사전조사 체크리스트\n`;
    report += `${'='.repeat(50)}\n\n`;
    report += `건물명: ${building.name}\n`;
    report += `유형: ${BUILDING_TYPE_LABELS[building.type]}\n`;
    report += `주소: ${building.address}\n`;
    report += `조사일: ${new Date().toLocaleDateString('ko-KR')}\n`;
    report += `진행률: ${progress}%\n\n`;

    sections.forEach((section) => {
      report += `\n[${section.name}]\n`;
      report += `${'-'.repeat(40)}\n`;
      section.items.forEach((item) => {
        const status = item.checked ? '[O]' : '[ ]';
        report += `${status} ${item.label}`;
        if (item.required) report += ' (필수)';
        report += '\n';
        if (item.note) {
          report += `   메모: ${item.note}\n`;
        }
      });
    });

    return report;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{building.name}</h2>
                  <Badge variant="outline">{BUILDING_TYPE_LABELS[building.type]}</Badge>
                </div>
                <p className="text-sm text-slate-500">{building.address}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                저장
              </Button>
              <Button onClick={handleExport} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Download className="h-4 w-4" />
                리포트 다운로드
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">체크리스트 진행률</span>
              <span className="text-sm font-bold text-emerald-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Checklist Sections */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <Accordion type="multiple" defaultValue={sections.map((s) => s.id)}>
            {sections.map((section) => {
              const sectionProgress =
                section.items.length > 0
                  ? Math.round(
                      (section.items.filter((i) => i.checked).length / section.items.length) * 100
                    )
                  : 0;

              return (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{section.name}</span>
                      {section.required && (
                        <Badge variant="destructive" className="text-xs">
                          필수
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={
                          sectionProgress === 100
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                            : ''
                        }
                      >
                        {section.items.filter((i) => i.checked).length}/{section.items.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg border transition-colors ${
                            item.checked
                              ? 'bg-emerald-50 border-emerald-200'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={item.id}
                              checked={item.checked}
                              onCheckedChange={(checked) =>
                                handleCheckItem(section.id, item.id, checked as boolean)
                              }
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={item.id}
                                className="text-sm font-medium cursor-pointer flex items-center gap-2"
                              >
                                {item.label}
                                {item.required && (
                                  <span className="text-red-500 text-xs">*필수</span>
                                )}
                                {item.hasPhoto && (
                                  <Camera className="h-3 w-3 text-slate-400" />
                                )}
                              </label>
                              {item.checked && (
                                <div className="mt-2">
                                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                                    <MessageSquare className="h-3 w-3" />
                                    메모 (선택)
                                  </div>
                                  <Textarea
                                    placeholder="추가 메모를 입력하세요..."
                                    value={item.note || ''}
                                    onChange={(e) =>
                                      handleNoteChange(section.id, item.id, e.target.value)
                                    }
                                    className="text-sm resize-none"
                                    rows={2}
                                  />
                                </div>
                              )}
                            </div>
                            {item.checked && (
                              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
