
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Auto-redirect to dashboard for demo purposes
  useEffect(() => {
    // Comment this if you want to show the landing page instead of auto-redirecting
    // navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-marketplace-primary to-marketplace-secondary flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="text-xl font-semibold text-gray-900">Marketplace</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#" className="text-sm font-medium text-gray-700 hover:text-marketplace-primary">
              Como funciona
            </Link>
            <Link to="#" className="text-sm font-medium text-gray-700 hover:text-marketplace-primary">
              Categorias
            </Link>
            <Link to="#" className="text-sm font-medium text-gray-700 hover:text-marketplace-primary">
              Para prestadores
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/dashboard">
                Entrar
              </Link>
            </Button>
            <Button asChild className="hidden md:flex">
              <Link to="/dashboard">
                Começar agora
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Encontre os melhores profissionais para seu projeto
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Conecte-se com prestadores de serviços qualificados, receba propostas personalizadas e gerencie seus projetos em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/request-service">
                  Solicitar um serviço
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">
                  Acessar dashboard
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center mt-8 text-sm text-gray-500">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span>Mais de 10.000 prestadores qualificados</span>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-marketplace-primary/20 to-marketplace-secondary/20 rounded-xl transform rotate-6"></div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
              alt="Profissionais trabalhando"
              className="relative rounded-xl shadow-lg"
            />
          </div>
        </div>
      </header>
      
      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Como funciona</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Um processo simples para encontrar o profissional perfeito para o seu projeto
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-marketplace-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-marketplace-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Solicite um serviço</h3>
              <p className="text-gray-600">
                Descreva o que você precisa em detalhes. Quanto mais informações, melhores serão as propostas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-marketplace-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-marketplace-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Receba propostas</h3>
              <p className="text-gray-600">
                Os prestadores enviarão propostas com orçamento, prazo e detalhes sobre como realizarão o trabalho.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-marketplace-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-marketplace-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Escolha e acompanhe</h3>
              <p className="text-gray-600">
                Selecione o prestador ideal, acompanhe o progresso e pague somente quando estiver satisfeito.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/request-service">
                Solicitar um serviço agora
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Categorias populares</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre prestadores para qualquer tipo de projeto
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-marketplace-primary">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <span>Design</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-marketplace-primary">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
              </svg>
              <span>Desenvolvimento</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-marketplace-primary">
                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" />
              </svg>
              <span>Marketing</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-marketplace-primary">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
              <span>Negócios</span>
            </Button>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="link" asChild>
              <Link to="/request-service" className="text-marketplace-primary">
                Ver todas as categorias
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-marketplace-primary font-bold">
                  M
                </div>
                <span className="text-xl font-semibold">Marketplace</span>
              </div>
              <p className="text-gray-400 mb-6">
                Uma plataforma que conecta clientes e prestadores de serviços de forma simples e eficiente.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Serviços</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Design</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Desenvolvimento</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Marketing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Negócios</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Sobre nós</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Como funciona</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Seja um prestador</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Termos de serviço</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Política de privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Ajuda</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Marketplace. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
