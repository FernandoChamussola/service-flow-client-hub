
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  DollarSign,
  Filter,
  Star,
  Clock,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import StatusBadge from "@/components/ui/StatusBadge";
import Navigation from "@/components/Navigation";

// Dummy data for proposals
const proposals = [
  {
    id: 1,
    provider: {
      id: 101,
      name: "Carlos Oliveira",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 4.8,
      reviewsCount: 47,
      isVerified: true,
    },
    price: 2800,
    deliveryTime: 14, // days
    status: "new" as const,
    createdAt: "2025-04-07T10:30:00",
    message: "Olá! Eu sou especialista em desenvolvimento web e posso criar um site personalizado conforme suas necessidades. Tenho ampla experiência em React e designs responsivos.",
    serviceTitle: "Desenvolvimento de Website",
  },
  {
    id: 2,
    provider: {
      id: 102,
      name: "Mariana Costa",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 4.9,
      reviewsCount: 83,
      isVerified: true,
    },
    price: 3200,
    deliveryTime: 12, // days
    status: "new" as const,
    createdAt: "2025-04-06T15:45:00",
    message: "Adorei seu projeto! Tenho 8 anos de experiência em design e desenvolvimento web, e gostaria de oferecer meus serviços para criar uma solução que atenda perfeitamente às suas necessidades.",
    serviceTitle: "Desenvolvimento de Website",
  },
  {
    id: 3,
    provider: {
      id: 103,
      name: "André Pereira",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4.6,
      reviewsCount: 29,
      isVerified: false,
    },
    price: 2500,
    deliveryTime: 18, // days
    status: "new" as const,
    createdAt: "2025-04-05T09:20:00",
    message: "Posso desenvolver um site profissional com todas as funcionalidades que você precisa. Minha abordagem é focada em usabilidade e performance.",
    serviceTitle: "Desenvolvimento de Website",
  },
  {
    id: 4,
    provider: {
      id: 104,
      name: "Juliana Santos",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 4.7,
      reviewsCount: 61,
      isVerified: true,
    },
    price: 3000,
    deliveryTime: 15, // days
    status: "pending" as const,
    createdAt: "2025-04-04T11:10:00",
    message: "Olá! Como designer e desenvolvedora full-stack, posso oferecer uma solução completa para o seu projeto, desde o design até a implementação final.",
    serviceTitle: "Desenvolvimento de Website",
  },
];

type SortOption = "price-asc" | "price-desc" | "rating-desc" | "delivery-asc";

const ProposalsList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortOption>("rating-desc");
  const [expandedProposal, setExpandedProposal] = useState<number | null>(null);
  
  // Filter and sort the proposals
  const filteredProposals = proposals.filter(proposal => 
    proposal.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedProposals = [...filteredProposals].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return b.provider.rating - a.provider.rating;
      case "delivery-asc":
        return a.deliveryTime - b.deliveryTime;
      default:
        return 0;
    }
  });
  
  const toggleExpand = (id: number) => {
    setExpandedProposal(expandedProposal === id ? null : id);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Propostas recebidas</h1>
              <p className="text-gray-600 mt-1">
                {sortedProposals.length} propostas para "Desenvolvimento de Website"
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters - Desktop */}
            <div className="hidden md:block space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Filtros</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ordenar por</label>
                    <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating-desc">Melhor avaliação</SelectItem>
                        <SelectItem value="price-asc">Menor preço</SelectItem>
                        <SelectItem value="price-desc">Maior preço</SelectItem>
                        <SelectItem value="delivery-asc">Menor prazo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="text"
                        placeholder="Buscar propostas"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={() => setSearchTerm("")}
                          className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Filters - Mobile */}
            <Collapsible
              open={isFilterOpen}
              onOpenChange={setIsFilterOpen}
              className="md:hidden col-span-full mb-4"
            >
              <CollapsibleContent className="space-y-4 mt-2">
                <Card>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ordenar por</label>
                      <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rating-desc">Melhor avaliação</SelectItem>
                          <SelectItem value="price-asc">Menor preço</SelectItem>
                          <SelectItem value="price-desc">Maior preço</SelectItem>
                          <SelectItem value="delivery-asc">Menor prazo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Buscar</label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="text"
                          placeholder="Buscar propostas"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9"
                        />
                        {searchTerm && (
                          <button
                            type="button"
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Proposals List */}
            <div className="md:col-span-3 space-y-4">
              {sortedProposals.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-gray-100 p-3 mb-4">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <CardTitle className="text-xl text-center mb-2">Nenhuma proposta encontrada</CardTitle>
                    <CardDescription className="text-center">
                      Tente ajustar seus filtros ou busca para ver mais resultados.
                    </CardDescription>
                  </CardContent>
                </Card>
              ) : (
                sortedProposals.map((proposal) => (
                  <Card key={proposal.id} className="overflow-hidden transition-all duration-200 marketplace-hover-card">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <img
                            src={proposal.provider.avatar}
                            alt={proposal.provider.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <CardTitle className="text-lg flex items-center">
                              {proposal.provider.name}
                              {proposal.provider.isVerified && (
                                <span className="ml-1 text-blue-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53-1.471-1.471a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.137-.089l4-5.598z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              )}
                            </CardTitle>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1 text-sm font-medium">{proposal.provider.rating}</span>
                              </div>
                              <span className="mx-1 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{proposal.provider.reviewsCount} avaliações</span>
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={proposal.status} />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <div className="font-medium">R$ {proposal.price.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Valor total</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <div className="font-medium">{proposal.deliveryTime} dias</div>
                            <div className="text-xs text-gray-500">Prazo de entrega</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm line-clamp-2">
                          {proposal.message}
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Recebido {new Date(proposal.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between pt-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleExpand(proposal.id)}
                      >
                        {expandedProposal === proposal.id ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Menos detalhes
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Ver mais
                          </>
                        )}
                      </Button>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                        >
                          <Link to={`/proposal/${proposal.id}`}>
                            Ver detalhes
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                    
                    {expandedProposal === proposal.id && (
                      <div className="px-6 pb-4 bg-gray-50 animate-fade-in">
                        <p className="text-sm mb-4">
                          {proposal.message}
                        </p>
                        
                        <div className="flex justify-end">
                          <Button asChild>
                            <Link to={`/proposal/${proposal.id}`}>
                              Ver proposta completa
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProposalsList;
