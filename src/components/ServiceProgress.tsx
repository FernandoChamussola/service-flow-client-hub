
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MessageSquare,
  Download,
  FileText,
  Image,
  ChevronRight,
  ArrowLeft,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

// Dummy service data
const serviceData = {
  id: 1,
  title: "Desenvolvimento de Website",
  provider: {
    id: 101,
    name: "Carlos Oliveira",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  price: 2800,
  createdAt: "2025-04-07T10:30:00",
  startedAt: "2025-04-08T09:15:00",
  expectedDeliveryDate: "2025-04-22T18:00:00",
  status: "in-progress", // in-progress, completed
  progress: 60, // percentage
  milestones: [
    {
      id: 1,
      title: "Solicitação enviada",
      date: "07/04/2025",
      status: "completed",
    },
    {
      id: 2,
      title: "Proposta aceita",
      date: "08/04/2025",
      status: "completed",
    },
    {
      id: 3,
      title: "Projeto iniciado",
      date: "08/04/2025",
      status: "completed",
    },
    {
      id: 4,
      title: "Design aprovado",
      date: "12/04/2025",
      status: "active",
      description: "Layout e protótipos de interface aprovados"
    },
    {
      id: 5,
      title: "Desenvolvimento",
      date: "19/04/2025",
      status: "upcoming",
    },
    {
      id: 6,
      title: "Entrega final",
      date: "22/04/2025",
      status: "upcoming",
    },
  ],
  messages: [
    {
      id: 101,
      sender: "provider",
      text: "Olá! Obrigado por aceitar minha proposta. Já comecei a trabalhar no seu projeto e gostaria de confirmar alguns detalhes sobre as funcionalidades desejadas.",
      timestamp: "2025-04-08T10:25:00",
    },
    {
      id: 102,
      sender: "client",
      text: "Olá Carlos! Claro, quais detalhes você precisa confirmar?",
      timestamp: "2025-04-08T11:43:00",
    },
    {
      id: 103,
      sender: "provider",
      text: "Gostaria de confirmar se você prefere um design mais minimalista ou algo mais colorido e detalhado. Também preciso saber se você já tem logotipo ou se precisamos criar um.",
      timestamp: "2025-04-08T12:10:00",
    },
    {
      id: 104,
      sender: "client",
      text: "Prefiro algo mais minimalista, com bastante espaço em branco. E sim, já tenho o logotipo, vou enviá-lo para você!",
      timestamp: "2025-04-08T13:22:00",
    },
  ],
  files: [
    {
      id: 201,
      name: "design-mockup-v1.pdf",
      size: "2.5 MB",
      uploadedBy: "provider",
      uploadedAt: "2025-04-11T14:30:00",
      type: "pdf",
    },
    {
      id: 202,
      name: "homepage-layout.jpg",
      size: "1.2 MB",
      uploadedBy: "provider",
      uploadedAt: "2025-04-11T14:35:00",
      type: "image",
    },
    {
      id: 203,
      name: "company-logo.png",
      size: "0.8 MB",
      uploadedBy: "client",
      uploadedAt: "2025-04-08T13:30:00",
      type: "image",
    },
  ],
};

const ServiceProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [newMessage, setNewMessage] = useState("");
  
  // In a real app, you would fetch the service data based on the ID
  // For now, we'll just use our dummy data
  const service = serviceData;
  
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, you would send the message to the backend
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada para o prestador.",
    });
    
    setNewMessage("");
  };
  
  // Get the current milestone (the one that is active)
  const currentMilestone = service.milestones.find(m => m.status === "active");
  
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
            Voltar para dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
                <Badge variant="outline" className="ml-2">
                  {service.status === "in-progress" ? "Em andamento" : "Concluído"}
                </Badge>
              </div>
              <p className="text-gray-600 mt-1">
                Prestador: {service.provider.name}
              </p>
            </div>
            
            {service.status === "in-progress" && (
              <div className="flex items-center space-x-2">
                <Button asChild>
                  <Link to={`/service/${service.id}/approve`}>
                    Aprovar entrega
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Timeline */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Progresso do serviço</CardTitle>
                  <CardDescription>
                    {service.progress}% concluído
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div 
                      className="bg-marketplace-primary h-2.5 rounded-full" 
                      style={{ width: `${service.progress}%` }}
                    ></div>
                  </div>
                  
                  {/* Timeline */}
                  <Timeline>
                    {service.milestones.map((milestone, index) => (
                      <TimelineItem
                        key={milestone.id}
                        title={milestone.title}
                        date={milestone.date}
                        status={milestone.status}
                        isLast={index === service.milestones.length - 1}
                        description={milestone.description}
                      />
                    ))}
                  </Timeline>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Detalhes</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Data de início</span>
                    </div>
                    <span className="text-sm font-medium">
                      {new Date(service.startedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Previsão de entrega</span>
                    </div>
                    <span className="text-sm font-medium">
                      {new Date(service.expectedDeliveryDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Valor total</span>
                    <span className="text-sm font-medium">
                      R$ {service.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Status atual</span>
                    <Badge>
                      {currentMilestone?.title || "Em andamento"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Communication and Files */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <Tabs defaultValue="messages">
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-center">
                      <CardTitle>Comunicação e Arquivos</CardTitle>
                      <TabsList>
                        <TabsTrigger value="messages">Mensagens</TabsTrigger>
                        <TabsTrigger value="files">Arquivos</TabsTrigger>
                      </TabsList>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <TabsContent value="messages" className="space-y-4">
                      <div className="space-y-4 max-h-[400px] overflow-y-auto p-1">
                        {service.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender === "client" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`rounded-lg p-3 max-w-[80%] ${
                                message.sender === "client"
                                  ? "bg-marketplace-primary text-white"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <div className="text-sm">{message.text}</div>
                              <div
                                className={`text-xs mt-1 flex items-center ${
                                  message.sender === "client"
                                    ? "text-white/80"
                                    : "text-gray-500"
                                }`}
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(message.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                                {" · "}
                                {new Date(message.timestamp).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={sendMessage}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Enviar
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="files">
                      <div className="space-y-4">
                        {service.files.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center space-x-3">
                              {file.type === "pdf" ? (
                                <FileText className="h-8 w-8 text-red-500" />
                              ) : (
                                <Image className="h-8 w-8 text-blue-500" />
                              )}
                              
                              <div>
                                <div className="font-medium">{file.name}</div>
                                <div className="text-xs text-gray-500 flex items-center">
                                  {file.size} · Enviado por {file.uploadedBy === "provider" ? service.provider.name : "você"} · {new Date(file.uploadedAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        {service.files.length === 0 && (
                          <div className="text-center py-8">
                            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-700">Nenhum arquivo compartilhado</h3>
                            <p className="text-gray-500 mt-1">
                              Os arquivos compartilhados por você e pelo prestador aparecerão aqui.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceProgress;
