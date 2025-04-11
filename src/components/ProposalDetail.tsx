
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  DollarSign,
  Star,
  Mail,
  Phone,
  Clock,
  Check,
  X,
  MessageSquare,
  ArrowLeft,
  FileText,
  ChevronDown,
  ChevronUp,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

// Dummy proposal data
const proposalData = {
  id: 1,
  provider: {
    id: 101,
    name: "Carlos Oliveira",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 4.8,
    reviewsCount: 47,
    isVerified: true,
    location: "São Paulo, SP",
    memberSince: "Março 2022",
    completedJobs: 58,
    bio: "Desenvolvedor web full-stack com mais de 7 anos de experiência. Especializado em React, Node.js e design responsivo. Sempre focado em entregar projetos de alta qualidade com excelente experiência de usuário.",
    contact: {
      email: "carlos@exemplo.com",
      phone: "+55 11 99999-9999"
    }
  },
  price: 2800,
  deliveryTime: 14, // days
  status: "new",
  createdAt: "2025-04-07T10:30:00",
  message: "Olá! Eu sou especialista em desenvolvimento web e posso criar um site personalizado conforme suas necessidades. Tenho ampla experiência em React e designs responsivos.\n\nBaseado nas suas especificações, posso desenvolver um site moderno e otimizado para dispositivos móveis, com todas as funcionalidades solicitadas. Inclui design personalizado, funcionalidades responsivas, e painel administrativo para você gerenciar o conteúdo.\n\nEstou disponível para começar imediatamente e comprometido a entregar um trabalho de qualidade dentro do prazo estipulado.",
  serviceTitle: "Desenvolvimento de Website",
  budget: {
    development: 1500,
    design: 800,
    testing: 300,
    hosting: 200,
    total: 2800
  },
  portfolio: [
    {
      id: 1,
      title: "E-commerce de Moda",
      image: "https://images.unsplash.com/photo-1648737963503-1a26da876aca?q=80&w=2070",
      description: "Desenvolvimento completo de loja virtual com integração de pagamentos e gestão de estoque."
    },
    {
      id: 2,
      title: "Site Corporativo",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064",
      description: "Site responsivo para empresa de consultoria com área de blog e formulários personalizados."
    },
    {
      id: 3,
      title: "Aplicativo Web para Restaurante",
      image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?q=80&w=2070",
      description: "Sistema de pedidos online com cardápio digital e integração com sistema de delivery."
    }
  ],
  terms: [
    "Prazo de 14 dias úteis a partir da aprovação da proposta",
    "Inclui até 3 rounds de revisões",
    "Inclui treinamento para uso do painel administrativo",
    "Suporte técnico por 30 dias após a entrega",
    "Pagamento: 50% no início e 50% na entrega"
  ]
};

const ProposalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [negotiateDialogOpen, setNegotiateDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [negotiationMessage, setNegotiationMessage] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  
  // In a real app, you would fetch the proposal data based on the ID
  // For now, we'll just use our dummy data
  const proposal = proposalData;
  
  const handleAcceptProposal = () => {
    setConfirmDialogOpen(false);
    
    toast({
      title: "Proposta aceita!",
      description: `Você aceitou a proposta de ${proposal.provider.name}. O prestador será notificado.`,
    });
    
    // Navigate to the service page after accepting
    setTimeout(() => {
      navigate(`/service/${proposal.id}`);
    }, 1500);
  };
  
  const handleNegotiateProposal = () => {
    setNegotiateDialogOpen(false);
    
    toast({
      title: "Contraproposta enviada!",
      description: `Sua contraproposta foi enviada para ${proposal.provider.name}.`,
    });
    
    // Navigate back to proposals list
    setTimeout(() => {
      navigate("/proposals");
    }, 1500);
  };
  
  const handleRejectProposal = () => {
    setRejectDialogOpen(false);
    
    toast({
      title: "Proposta recusada",
      description: "O prestador foi notificado sobre sua decisão.",
    });
    
    // Navigate back to proposals list
    setTimeout(() => {
      navigate("/proposals");
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
            Voltar para propostas
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Provider Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="space-y-4">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={proposal.provider.avatar}
                      alt={proposal.provider.name}
                      className="w-20 h-20 rounded-full object-cover mb-3"
                    />
                    <CardTitle className="text-xl flex items-center justify-center">
                      {proposal.provider.name}
                      {proposal.provider.isVerified && (
                        <span className="ml-1 text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53-1.471-1.471a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.137-.089l4-5.598z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </CardTitle>
                    <div className="flex items-center justify-center mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{proposal.provider.rating}</span>
                      </div>
                      <span className="mx-1 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{proposal.provider.reviewsCount} avaliações</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Localização</p>
                      <p className="font-medium">{proposal.provider.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Membro desde</p>
                      <p className="font-medium">{proposal.provider.memberSince}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Trabalhos concluídos</p>
                      <p className="font-medium">{proposal.provider.completedJobs}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Sobre o prestador</h3>
                    <p className="text-sm text-gray-700">{proposal.provider.bio}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Contato</h3>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{proposal.provider.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{proposal.provider.contact.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Proposal Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proposta para {proposal.serviceTitle}</CardTitle>
                  <CardDescription>
                    Recebida em {new Date(proposal.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <div className="font-medium text-lg">R$ {proposal.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Valor total</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <div className="font-medium text-lg">{proposal.deliveryTime} dias</div>
                        <div className="text-sm text-gray-500">Prazo de entrega</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Mensagem do prestador</h3>
                    <div className="bg-gray-50 p-4 rounded-md text-sm whitespace-pre-line">
                      {proposal.message}
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="budget">
                      <AccordionTrigger className="font-medium">
                        Orçamento detalhado
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-1 border-b">
                            <span>Desenvolvimento</span>
                            <span className="font-medium">R$ {proposal.budget.development.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span>Design</span>
                            <span className="font-medium">R$ {proposal.budget.design.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span>Testes</span>
                            <span className="font-medium">R$ {proposal.budget.testing.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span>Hospedagem (1 ano)</span>
                            <span className="font-medium">R$ {proposal.budget.hosting.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between py-1 font-medium text-base mt-2">
                            <span>Total</span>
                            <span>R$ {proposal.budget.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="terms">
                      <AccordionTrigger className="font-medium">
                        Termos e condições
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {proposal.terms.map((term, index) => (
                            <li key={index}>{term}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setRejectDialogOpen(true)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Recusar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setNegotiateDialogOpen(true)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Negociar
                  </Button>
                  <Button
                    className="w-full sm:w-auto"
                    onClick={() => setConfirmDialogOpen(true)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Aceitar proposta
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Portfólio do prestador</CardTitle>
                  <CardDescription>
                    Veja alguns trabalhos realizados por {proposal.provider.name}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {proposal.portfolio.map((item) => (
                      <div key={item.id} className="rounded-md overflow-hidden border">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-3">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Accept Proposal Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aceitar proposta</DialogTitle>
            <DialogDescription>
              Você está prestes a aceitar a proposta de {proposal.provider.name}. Após a confirmação, o prestador será notificado e poderá iniciar o trabalho.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Valor total:</span>
              <span className="font-bold">R$ {proposal.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Prazo de entrega:</span>
              <span>{proposal.deliveryTime} dias</span>
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
              onClick={handleAcceptProposal}
            >
              Confirmar aceitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Negotiate Proposal Dialog */}
      <Dialog open={negotiateDialogOpen} onOpenChange={setNegotiateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar contraproposta</DialogTitle>
            <DialogDescription>
              Envie uma mensagem para {proposal.provider.name} com seus termos ou solicitações de alteração.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Tabs defaultValue="message">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="message">Mensagem</TabsTrigger>
                <TabsTrigger value="terms">Termos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="message" className="space-y-4 pt-4">
                <Textarea
                  placeholder="Digite sua mensagem ao prestador..."
                  className="min-h-[120px]"
                  value={negotiationMessage}
                  onChange={(e) => setNegotiationMessage(e.target.value)}
                />
              </TabsContent>
              
              <TabsContent value="terms" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Novo valor proposto (R$)</label>
                  <input 
                    type="number" 
                    className="marketplace-input" 
                    defaultValue={proposal.price}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Novo prazo proposto (dias)</label>
                  <input 
                    type="number" 
                    className="marketplace-input" 
                    defaultValue={proposal.deliveryTime}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNegotiateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleNegotiateProposal}
            >
              Enviar contraproposta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reject Proposal Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Recusar proposta</DialogTitle>
            <DialogDescription>
              Por favor, informe o motivo pelo qual você está recusando esta proposta. Isso ajudará o prestador a melhorar suas propostas futuras.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Digite o motivo da recusa (opcional)..."
              className="min-h-[120px]"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectProposal}
            >
              Confirmar recusa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProposalDetail;
