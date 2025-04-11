
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Check,
  X,
  FileText,
  ArrowLeft,
  Star,
  Image,
  Download,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

// Dummy service data for approval
const serviceData = {
  id: 1,
  title: "Desenvolvimento de Website",
  provider: {
    id: 101,
    name: "Carlos Oliveira",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 4.8,
  },
  price: 2800,
  startedAt: "2025-04-08T09:15:00",
  completedAt: "2025-04-21T16:30:00",
  expectedCompletionDate: "2025-04-22T18:00:00",
  description: "Desenvolvimento de um website responsivo para minha empresa, incluindo design personalizado, área de blog e formulário de contato.",
  deliverables: [
    "Website responsivo com 5 páginas principais",
    "Painel administrativo para gerenciamento de conteúdo",
    "Integração com Google Analytics",
    "Formulário de contato funcional",
    "Otimização para SEO",
  ],
  files: [
    {
      id: 301,
      name: "website-final.zip",
      size: "15.7 MB",
      type: "zip",
    },
    {
      id: 302,
      name: "screenshot-desktop.jpg",
      size: "2.3 MB",
      type: "image",
    },
    {
      id: 303,
      name: "screenshot-mobile.jpg",
      size: "1.8 MB",
      type: "image",
    },
    {
      id: 304,
      name: "documentation.pdf",
      size: "3.5 MB",
      type: "pdf",
    },
  ],
  deliveryNotes: "Todos os arquivos do projeto estão incluídos no arquivo ZIP. A documentação PDF contém instruções de uso e informações de acesso ao painel administrativo. As capturas de tela mostram como o site se comporta em dispositivos desktop e móveis. Por favor, entre em contato se precisar de algum ajuste ou esclarecimento!"
};

const ServiceApproval = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState("");
  
  // In a real app, you would fetch the service data based on the ID
  // For now, we'll just use our dummy data
  const service = serviceData;
  
  const handleApprove = () => {
    setConfirmDialogOpen(false);
    
    toast({
      title: "Serviço aprovado!",
      description: "Sua avaliação foi enviada e o pagamento foi liberado para o prestador.",
    });
    
    // Navigate to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };
  
  const handleRequestRevision = () => {
    setRevisionDialogOpen(false);
    
    toast({
      title: "Solicitação de ajustes enviada",
      description: `Suas solicitações foram enviadas para ${service.provider.name}.`,
    });
    
    // Navigate back to service
    setTimeout(() => {
      navigate(`/service/${service.id}`);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o serviço
          </Button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Aprovação de serviço</h1>
            <p className="text-gray-600 mt-2">
              Revise a entrega e forneça seu feedback para {service.provider.name}.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Service Summary */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do serviço</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={service.provider.avatar}
                      alt={service.provider.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{service.provider.name}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{service.provider.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Valor</span>
                    <span className="font-medium">R$ {service.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Data de início</span>
                    <span className="text-sm">
                      {new Date(service.startedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Data de entrega</span>
                    <span className="text-sm">
                      {new Date(service.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Prazo estipulado</span>
                    <span className="text-sm">
                      {new Date(service.expectedCompletionDate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Deliverables and Review */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Entregáveis</CardTitle>
                  <CardDescription>
                    Itens entregues conforme solicitado
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Lista de entregáveis</h3>
                    <ul className="space-y-1">
                      {service.deliverables.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Arquivos entregues</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md"
                        >
                          {file.type === "pdf" ? (
                            <FileText className="h-8 w-8 text-red-500" />
                          ) : file.type === "image" ? (
                            <Image className="h-8 w-8 text-blue-500" />
                          ) : (
                            <FileText className="h-8 w-8 text-gray-500" />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{file.name}</div>
                            <div className="text-xs text-gray-500">{file.size}</div>
                          </div>
                          
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Observações do prestador</h3>
                    <div className="bg-gray-50 p-3 rounded-md text-sm">
                      {service.deliveryNotes}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sua avaliação</CardTitle>
                  <CardDescription>
                    Avalie o serviço prestado e forneça seu feedback
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Classificação</h3>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              rating >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Feedback (opcional)</h3>
                    <Textarea
                      placeholder="Compartilhe sua experiência com este prestador..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setRevisionDialogOpen(true)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Solicitar ajustes
                  </Button>
                  <Button
                    onClick={() => setConfirmDialogOpen(true)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Aprovar e finalizar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Approval Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar serviço</DialogTitle>
            <DialogDescription>
              Ao aprovar este serviço, você confirma que o trabalho foi concluído satisfatoriamente e autoriza o pagamento ao prestador.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Avaliação:</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {feedback && (
              <div>
                <span className="font-medium">Seu feedback:</span>
                <p className="text-sm mt-1 bg-gray-50 p-2 rounded">{feedback}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Valor a ser pago:</span>
              <span className="font-bold">R$ {service.price.toLocaleString()}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleApprove}
            >
              Confirmar aprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Revision Request Dialog */}
      <Dialog open={revisionDialogOpen} onOpenChange={setRevisionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar ajustes</DialogTitle>
            <DialogDescription>
              Descreva os ajustes necessários para que o prestador possa fazer as correções solicitadas.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Descreva detalhadamente quais ajustes são necessários..."
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRevisionDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleRequestRevision}
            >
              Enviar solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceApproval;
