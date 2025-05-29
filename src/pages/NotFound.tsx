
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Página não encontrada</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/dashboard">
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
