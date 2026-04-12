import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCVStore } from '@/store/cv-store';
import { parseCV } from '@/lib/api/parse-cv';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { CVContent, cvContentSchema } from '@/types/cv';

interface ImportCVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ModalState = 'input' | 'loading' | 'preview' | 'done';

export function ImportCVModal({ open, onOpenChange }: ImportCVModalProps) {
  const [state, setState] = useState<ModalState>('input');
  const [rawText, setRawText] = useState('');
  const [parsedData, setParsedData] = useState<Partial<CVContent> | null>(null);
  const setCurrentCV = useCVStore((s) => s.setCurrentCV);
  const currentCV = useCVStore((s) => s.currentCV);

  // Reset state when opening modal
  React.useEffect(() => {
    if (open) {
      setState('input');
      setRawText('');
      setParsedData(null);
    }
  }, [open]);

  const handleAnalyze = async () => {
    if (rawText.length < 50) return;

    setState('loading');
    try {
      const data = await parseCV(rawText);
      setParsedData(data);
      setState('preview');
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue lors de l\'analyse.');
      setState('input');
    }
  };

  const handleConfirm = () => {
    if (!parsedData || !currentCV) return;

    try {
      // Validate and cast data against schema (allowing partial/missing fields to be filled with defaults or ignored depending on implementation, here we rely on the type but should be careful)
      // Since it's from AI, we might want to do a full validation or just merge it
      const newData: CVContent = {
        personalInfo: {
          ...currentCV.content.personalInfo,
          ...(parsedData.personalInfo || {}),
        },
        experiences: parsedData.experiences || [],
        education: parsedData.education || [],
        skills: parsedData.skills || [],
        languages: parsedData.languages || [],
        references: parsedData.references || [],
      };

      // Validate with zod
      const result = cvContentSchema.safeParse(newData);
      if (!result.success) {
         console.error("Validation error:", result.error);
         // Fallback: merge without strict fail, but warn
         toast.warning("Certaines données n'ont pas un format parfait, mais elles ont été importées.");
      }

      setCurrentCV({
        ...currentCV,
        content: newData,
      });

      setState('done');
      toast.success('CV importé avec succès !');
      onOpenChange(false);
    } catch (err) {
      toast.error('Erreur lors de l\'intégration des données.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={state === 'loading' ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importer un CV existant</DialogTitle>
          <DialogDescription>
            Collez le texte de votre ancien CV. Notre IA va l'analyser et remplir les champs automatiquement.
          </DialogDescription>
        </DialogHeader>

        {state === 'input' && (
          <div className="flex flex-col space-y-4 py-4">
            <Textarea
              placeholder="Collez le contenu de votre CV ici..."
              className="min-h-[250px] resize-none"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />
            <div className="text-sm text-muted-foreground text-right">
              {rawText.length} caractères
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button onClick={handleAnalyze} disabled={rawText.length < 50}>
                Analyser avec l'IA ✨
              </Button>
            </DialogFooter>
          </div>
        )}

        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium">Analyse en cours...</p>
            <p className="text-sm text-muted-foreground">Veuillez patienter, cela peut prendre quelques secondes.</p>
          </div>
        )}

        {state === 'preview' && parsedData && (
          <div className="flex flex-col space-y-4 py-4">
            <div className="rounded-md bg-muted p-4 space-y-3">
              <h3 className="font-semibold">Données trouvées :</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Informations personnelles ({Object.values(parsedData.personalInfo || {}).filter(Boolean).length} champs remplis)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {parsedData.experiences?.length || 0} expérience(s) trouvée(s)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {parsedData.education?.length || 0} formation(s) trouvée(s)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {parsedData.skills?.length || 0} compétence(s) trouvée(s)
                </li>
                {(!parsedData.references || parsedData.references.length === 0) && (
                   <li className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                     <AlertTriangle className="h-4 w-4" />
                     Aucune référence trouvée
                   </li>
                )}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-md">
              <AlertTriangle className="h-5 w-5" />
              <p>Attention : Cela remplacera les données actuelles de votre CV.</p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setState('input')}>
                Annuler
              </Button>
              <Button onClick={handleConfirm}>
                Confirmer et remplir
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
