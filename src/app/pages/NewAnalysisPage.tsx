import { Upload, Zap } from "lucide-react";
import { useRef, useState } from "react";
import Badge from "../components/ui/badge";
import Button from "../components/ui/button";
import { cn } from "../lib/cn";

const NewAnalysisPage = ({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) => {
     const [company, setCompany] = useState("");
     const [role, setRole] = useState("");
     const [jobDesc, setJobDesc] = useState("");
     const [file, setFile] = useState<File | null>(null);
     const fileRef = useRef<HTMLInputElement>(null);

     const [errors, setErrors] = useState<Record<string, string>>({});

     const acceptFile = (f: File) => {
          if (f.type === "application/pdf" || f.name.endsWith(".docx")) {
               setFile(f);
               setErrors((p) => ({ ...p, file: "" }));
          } else {
               setErrors((p) => ({ ...p, file: "Format non supporté. Utilisez PDF ou DOCX." }));
          }
     };

     const validate = () => {
          const e: Record<string, string> = {};
          if (!company.trim()) e.company = "Le nom de l'entreprise est requis.";
          if (!role.trim()) e.role = "L'intitulé du poste est requis.";
          if (!jobDesc.trim()) e.jobDesc = "La description du poste est requise.";
          if (!file) e.file = "Veuillez télécharger votre CV.";

          setErrors(e);
          return Object.keys(e).length === 0;
     };

     return (
          <main className="max-w-2xl mx-auto px-6 py-10">
               <button
                    onClick={onBack}
                    className="flex items-center gap-2 font-bold text-muted-foreground  hover:text-black mb-8 cursor-pointer transition-colors"
                    aria-label="Retour au tableau de bord"
               >
                    ← Retour au tableau de bord
               </button>

               <h1 className="text-4xl font-bold mb-2">Nouvelle analyse</h1>
               <p className="text-muted-foreground font-medium mb-8">
                    Téléchargez votre CV et renseignez les informations de l'offre.
                    <br />
                    Notre IA analysera leur compatibilité.
               </p>

               <div className="space-y-6">
                    {/* CV Upload */}
                    <div>
                         <label className="block text-sm font-bold uppercase tracking-widest mb-2">
                              CV <span className="text-destructive">*</span>
                         </label>
                         {file ? (
                              <div>File loaded</div>
                         ) : (
                              <div
                                   className={cn(
                                        "p-10 border-4 border-dashed text-center cursor-pointer transition-colors",
                                        "hover:bg-primary/10",
                                   )}
                                   role="button"
                                   aria-label="Cliquez ou glissez votre CV"
                                   onClick={() => fileRef.current?.click()}
                              >
                                   <Upload
                                        size={36}
                                        className="mx-auto mb-3 text-muted-foreground"
                                        aria-hidden="true"
                                   />
                                   <p className="font-bold text-lg mb-1">Glissez votre CV ici</p>
                                   <p className="text-muted-foreground font-medium mb-3">ou cliquez pour parcourir</p>
                                   <div className="flex gap-2 justify-center">
                                        <Badge color="gray">PDF</Badge>
                                        <Badge color="gray">DOCX</Badge>
                                   </div>
                                   <input
                                        ref={fileRef}
                                        type="file"
                                        accept=".pdf,.docx,application/pdf"
                                        className="hidden"
                                        onChange={(e) => {
                                             const f = e.target.files?.[0];
                                             if (f) acceptFile(f);
                                        }}
                                   />
                              </div>
                         )}
                         {errors.file && (
                              <p className="text-destructive text-sm mt-1 font-bold" role="alert">
                                   ⚠ {errors.file}
                              </p>
                         )}
                    </div>

                    {/* Company */}
                    <div>
                         <label htmlFor="company" className="block text-sm font-bold uppercase tracking-widest mb-2">
                              Entreprise <span className="text-destructive">*</span>
                         </label>
                         <input
                              id="company"
                              type="text"
                              placeholder="Ex : Capgemini, Société Generale, Atos..."
                              className="w-full px-4 py-3 border-2 font-medium placeholder:text-muted-foreground focus:outline-none focus:bg-primary/10 shadow-md"
                              onChange={(e) => setCompany(e.target.value)}
                         />
                         {errors.company && (
                              <p className="text-destructive text-sm mt-1 font-bold" role="alert">
                                   ⚠ {errors.company}
                              </p>
                         )}
                    </div>

                    {/* Role */}
                    <div>
                         <label htmlFor="role" className="block text-sm font-black uppercase tracking-widest mb-2">
                              Intitulé du poste <span className="text-destructive">*</span>
                         </label>
                         <input
                              id="role"
                              type="text"
                              placeholder="Ex : Software Engineer, Product Manager..."
                              className="w-full px-4 py-3 border-2 font-medium placeholder:text-muted-foreground focus:outline-none focus:bg-primary/10 shadow-md"
                              onChange={(e) => setRole(e.target.value)}
                         />
                         {errors.role && (
                              <p className="text-destructive text-sm mt-1 font-bold" role="alert">
                                   ⚠ {errors.role}
                              </p>
                         )}
                    </div>

                    {/* Job description */}
                    <div>
                         <label htmlFor="jobdesc" className="block text-sm font-black uppercase tracking-widest mb-2">
                              Description du poste <span className="text-destructive">*</span>
                         </label>
                         <textarea
                              id="jobdesc"
                              placeholder="Collez ici le contenu complet de l'offre d'emploi..."
                              rows={10}
                              className="w-full px-4 py-3 border-2 font-medium  placeholder:text-muted-foreground focus:outline-none focus:bg-primary/10 shadow-md resize-y"
                              onChange={(e) => setJobDesc(e.target.value)}
                         />
                         {errors.jobDesc && (
                              <p className="text-destructive text-sm mt-1 font-bold" role="alert">
                                   ⚠ {errors.jobDesc}
                              </p>
                         )}
                    </div>

                    {/* Submit */}
                    <Button
                         size="lg"
                         className="w-full justify-center"
                         onClick={() => {
                              if (validate()) onSubmit();
                         }}
                    >
                         <Zap size={20} /> Analyser mon CV
                    </Button>
               </div>
          </main>
     );
};

export default NewAnalysisPage;
