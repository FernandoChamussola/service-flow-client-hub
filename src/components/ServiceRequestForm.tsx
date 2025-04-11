
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import FileUpload from "@/components/ui/FileUpload";
import Navigation from "@/components/Navigation";

const categories = [
  { 
    id: "design",
    name: "Design",
    subcategories: [
      { id: "graphic", name: "Design Gráfico" },
      { id: "web", name: "Web Design" },
      { id: "ui", name: "UI/UX Design" },
      { id: "logo", name: "Logo e Identidade Visual" },
    ]
  },
  { 
    id: "development",
    name: "Desenvolvimento",
    subcategories: [
      { id: "web", name: "Desenvolvimento Web" },
      { id: "mobile", name: "Desenvolvimento Mobile" },
      { id: "desktop", name: "Aplicações Desktop" },
      { id: "cms", name: "CMS e E-commerce" },
    ]
  },
  { 
    id: "marketing",
    name: "Marketing",
    subcategories: [
      { id: "social", name: "Marketing de Redes Sociais" },
      { id: "content", name: "Marketing de Conteúdo" },
      { id: "seo", name: "SEO" },
      { id: "email", name: "Email Marketing" },
    ]
  },
  { 
    id: "business",
    name: "Negócios",
    subcategories: [
      { id: "consulting", name: "Consultoria" },
      { id: "accounting", name: "Contabilidade" },
      { id: "legal", name: "Assessoria Jurídica" },
      { id: "planning", name: "Planejamento Estratégico" },
    ]
  },
];

const ServiceRequestForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("remote");
  const [files, setFiles] = useState<File[]>([]);
  
  const selectedCategory = categories.find(c => c.id === category);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would submit the form data to your backend
    // For now, let's simulate a submission
    
    toast({
      title: "Solicitação enviada com sucesso!",
      description: "Prestadores serão notificados e enviarão propostas em breve.",
    });
    
    // Navigate to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Solicitar novo serviço</h1>
            <p className="text-gray-600 mt-2">
              Preencha os detalhes abaixo para receber propostas de profissionais qualificados.
            </p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Detalhes do serviço</CardTitle>
                <CardDescription>
                  Quanto mais detalhes você fornecer, melhores serão as propostas recebidas.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Título do serviço */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título do serviço</Label>
                  <Input 
                    id="title" 
                    placeholder="Ex: Desenvolvimento de website para minha empresa" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                {/* Categoria e subcategoria */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select 
                      value={category} 
                      onValueChange={(value) => {
                        setCategory(value);
                        setSubcategory("");
                      }}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategoria</Label>
                    <Select 
                      value={subcategory} 
                      onValueChange={setSubcategory}
                      disabled={!category}
                      required
                    >
                      <SelectTrigger id="subcategory">
                        <SelectValue placeholder="Selecione uma subcategoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory?.subcategories.map((subcat) => (
                          <SelectItem key={subcat.id} value={subcat.id}>
                            {subcat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição detalhada</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva o que você precisa, inclua detalhes importantes e requisitos específicos."
                    className="min-h-[150px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                {/* Prazo e Orçamento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Prazo desejado</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="deadline"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {deadline ? (
                            format(deadline, "PPP", { locale: pt })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={deadline}
                          onSelect={setDeadline}
                          initialFocus
                          fromDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Orçamento estimado (R$)</Label>
                    <Input 
                      id="budget" 
                      type="number" 
                      min="0"
                      placeholder="Seu orçamento máximo"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Local de atendimento */}
                <div className="space-y-2">
                  <Label>Local de atendimento</Label>
                  <RadioGroup 
                    value={location} 
                    onValueChange={setLocation}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="remote" id="remote" />
                      <Label htmlFor="remote" className="font-normal">Remoto (online)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <Label htmlFor="in-person" className="font-normal">Presencial</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both" className="font-normal">Ambos</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Arquivos */}
                <div className="space-y-2">
                  <FileUpload 
                    label="Anexar arquivos"
                    description="Adicione imagens, documentos ou qualquer referência que ajude a explicar seu projeto."
                    onChange={setFiles}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                  Cancelar
                </Button>
                <Button type="submit">Enviar solicitação</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ServiceRequestForm;
