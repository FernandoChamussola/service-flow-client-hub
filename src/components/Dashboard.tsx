
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  FileText,
  PlusCircle,
  Calendar,
  CheckCircle,
  Clock,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  Search,
  Filter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/ui/StatusBadge";
import Navigation from "@/components/Navigation";

// Dummy data for services
const servicesData = {
  active: [
    {
      id: 1,
      title: "Desenvolvimento de Website",
      provider: {
        id: 101,
        name: "Carlos Oliveira",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      status: "in-progress",
      lastUpdated: "2025-04-11T14:30:00",
      progress: 60,
      price: 2800,
      dueDate: "2025-04-22T18:00:00",
    },
    {
      id: 2,
      title: "Criação de Logo",
      provider: {
        id: 102,
        name: "Mariana Costa",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      status: "waiting",
      lastUpdated: "2025-04-10T09:45:00",
      progress: 30,
      price: 800,
      dueDate: "2025-04-18T12:00:00",
    }
  ],
  completed: [
    {
      id: 3,
      title: "Estratégia de Marketing Digital",
      provider: {
        id: 103,
        name: "André Pereira",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      status: "completed",
      lastUpdated: "2025-04-02T16:20:00",
      rating: 4.5,
      price: 1500,
      completedDate: "2025-04-02T16:20:00",
    },
    {
      id: 4,
      title: "Tradução de Documentos",
      provider: {
        id: 104,
        name: "Juliana Santos",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      status: "completed",
      lastUpdated: "2025-03-25T10:15:00",
      rating: 5,
      price: 450,
      completedDate: "2025-03-25T10:15:00",
    }
  ]
};

// Dummy data for proposals
const proposalsData = [
  {
    id: 1,
    serviceTitle: "Desenvolvimento de Website",
    providersCount: 3,
    lastUpdated: "2025-04-10T14:30:00",
    unreadCount: 2,
    budget: 3000,
  },
  {
    id: 2,
    serviceTitle: "Consultoria SEO",
    providersCount: 1,
    lastUpdated: "2025-04-09T09:15:00",
    unreadCount: 0,
    budget: 1200,
  }
];

// Dummy data for notifications
const notificationsData = [
  {
    id: 1,
    title: "Nova proposta recebida",
    description: "Carlos Oliveira enviou uma proposta para seu projeto.",
    date: "2025-04-11T14:30:00",
    isRead: false,
  },
  {
    id: 2,
    title: "Atualização do serviço",
    description: "Mariana Costa adicionou novos arquivos ao seu projeto.",
    date: "2025-04-10T11:45:00",
    isRead: false,
  },
  {
    id: 3,
    title: "Lembrete de pagamento",
    description: "Seu pagamento para André Pereira foi confirmado.",
    date: "2025-04-08T09:20:00",
    isRead: true,
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter services based on search term
  const filteredActiveServices = servicesData.active.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCompletedServices = servicesData.completed.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredProposals = proposalsData.filter(proposal => 
    proposal.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Gerencie seus serviços, propostas e pagamentos
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Main Content */}
            <div className="w-full md:w-3/4 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle>Seus serviços</CardTitle>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="text"
                          placeholder="Buscar serviços"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9 w-full sm:w-auto"
                        />
                      </div>
                      <Button asChild>
                        <Link to="/request-service">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Novo
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <Tabs defaultValue="active">
                    <TabsList className="mb-4">
                      <TabsTrigger value="active">Em andamento</TabsTrigger>
                      <TabsTrigger value="completed">Concluídos</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="active">
                      {filteredActiveServices.length === 0 ? (
                        <div className="text-center py-8">
                          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-700">
                            {searchTerm ? "Nenhum serviço encontrado" : "Nenhum serviço em andamento"}
                          </h3>
                          <p className="text-gray-500 mt-1 mb-4">
                            {searchTerm 
                              ? "Tente ajustar sua busca para encontrar o que procura"
                              : "Comece solicitando um novo serviço para visualizá-lo aqui"}
                          </p>
                          {!searchTerm && (
                            <Button asChild>
                              <Link to="/request-service">
                                Solicitar serviço
                              </Link>
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredActiveServices.map((service) => (
                            <Card key={service.id}>
                              <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h3 className="font-medium">{service.title}</h3>
                                      <StatusBadge status={service.status} />
                                    </div>
                                    
                                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                                      <img
                                        src={service.provider.avatar}
                                        alt={service.provider.name}
                                        className="w-5 h-5 rounded-full object-cover"
                                      />
                                      <span>{service.provider.name}</span>
                                      <span>•</span>
                                      <span>R$ {service.price.toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="mb-2">
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>Progresso</span>
                                        <span>{service.progress}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div 
                                          className="bg-marketplace-primary h-1.5 rounded-full" 
                                          style={{ width: `${service.progress}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      <span>
                                        Prazo: {new Date(service.dueDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <Button variant="outline" size="sm" asChild>
                                      <Link to={`/service/${service.id}`}>
                                        Ver detalhes
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="completed">
                      {filteredCompletedServices.length === 0 ? (
                        <div className="text-center py-8">
                          <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-700">
                            {searchTerm ? "Nenhum serviço encontrado" : "Nenhum serviço concluído"}
                          </h3>
                          <p className="text-gray-500 mt-1">
                            {searchTerm 
                              ? "Tente ajustar sua busca para encontrar o que procura"
                              : "Os serviços concluídos aparecerão aqui"}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredCompletedServices.map((service) => (
                            <Card key={service.id}>
                              <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h3 className="font-medium">{service.title}</h3>
                                      <StatusBadge status={service.status} />
                                    </div>
                                    
                                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                                      <img
                                        src={service.provider.avatar}
                                        alt={service.provider.name}
                                        className="w-5 h-5 rounded-full object-cover"
                                      />
                                      <span>{service.provider.name}</span>
                                      <span>•</span>
                                      <span>R$ {service.price.toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-1 mb-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                          key={star}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill={star <= service.rating ? "#FBBF24" : "#E5E7EB"}
                                          className="h-4 w-4"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      ))}
                                      <span className="text-xs text-gray-500 ml-1">
                                        {service.rating.toFixed(1)}
                                      </span>
                                    </div>
                                    
                                    <div className="flex items-center text-xs text-gray-500">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      <span>
                                        Concluído em {new Date(service.completedDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <Button variant="outline" size="sm" asChild>
                                      <Link to={`/service/${service.id}`}>
                                        Ver detalhes
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Propostas recebidas</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/proposals">Ver todas</Link>
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  {filteredProposals.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-700">
                        {searchTerm ? "Nenhuma proposta encontrada" : "Nenhuma proposta recebida"}
                      </h3>
                      <p className="text-gray-500 mt-1 mb-4">
                        {searchTerm 
                          ? "Tente ajustar sua busca para encontrar o que procura"
                          : "As propostas de prestadores para seus serviços aparecerão aqui"}
                      </p>
                      {!searchTerm && (
                        <Button asChild>
                          <Link to="/request-service">
                            Solicitar serviço
                          </Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredProposals.map((proposal) => (
                        <div
                          key={proposal.id}
                          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{proposal.serviceTitle}</h3>
                              {proposal.unreadCount > 0 && (
                                <span className="ml-2 px-1.5 py-0.5 text-xs bg-marketplace-primary text-white rounded-full">
                                  {proposal.unreadCount} nova{proposal.unreadCount > 1 ? "s" : ""}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 mt-1">
                              <span>
                                {proposal.providersCount} proposta{proposal.providersCount > 1 ? "s" : ""}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span>
                                Orçamento: R$ {proposal.budget.toLocaleString()}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span>
                                Atualizado em {new Date(proposal.lastUpdated).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-2 sm:mt-0">
                            <Button size="sm" asChild>
                              <Link to="/proposals">
                                Ver propostas
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-1/4 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Notificações</CardTitle>
                </CardHeader>
                
                <CardContent className="pt-4">
                  {notificationsData.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">
                        Nenhuma notificação no momento
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notificationsData.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-md text-sm ${
                            notification.isRead ? "bg-gray-50" : "bg-blue-50"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {!notification.isRead && (
                              <span className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                            )}
                            <div>
                              <h4 className="font-medium">{notification.title}</h4>
                              <p className="text-gray-600 mt-1">
                                {notification.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.date).toLocaleDateString()} às{" "}
                                {new Date(notification.date).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-2">
                        <Button variant="link" size="sm" className="w-full">
                          Ver todas as notificações
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Progresso rápido</CardTitle>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Serviços ativos</span>
                        <span>{servicesData.active.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${(servicesData.active.length / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Propostas pendentes</span>
                        <span>{proposalsData.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-yellow-500 h-1.5 rounded-full" 
                          style={{ width: `${(proposalsData.length / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Serviços concluídos</span>
                        <span>{servicesData.completed.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          style={{ width: `${(servicesData.completed.length / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/request-service">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Solicitar novo serviço
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
