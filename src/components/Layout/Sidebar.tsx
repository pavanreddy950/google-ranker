import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Building2,
  BarChart3,
  FileText,
  Star,
  Settings,
  Search,
  MessageSquarePlus,
  Users,
  X,
  Crown,
  CreditCard,
  Mail
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Profiles", href: "/dashboard", icon: Users },
    { label: "Posts", href: "/dashboard/posts", icon: FileText },
    { label: "Reviews", href: "/dashboard/reviews", icon: Star },
    { label: "Audit Tool", href: "/dashboard/audit", icon: Search },
    { label: "Request for Reviews", href: "/dashboard/request-reviews", icon: Mail },
    { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  ];

  const isActive = (href: string) => {
    // Exact match for dashboard route
    if (href === "/dashboard") {
      return location.pathname === "/dashboard" || location.pathname === "/";
    }
    // For other routes, check if current path starts with the href
    return location.pathname.startsWith(href);
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen w-64 glass-card border-r-2 border-primary/30 transition-transform duration-300 ease-in-out",
      "lg:translate-x-0", // Always visible on desktop
      isOpen ? "translate-x-0" : "-translate-x-full" // Mobile: slide in/out based on isOpen
    )}>
      {/* Header - Match topbar height */}
      <div className="h-16 flex items-center justify-between p-4 border-b-2 border-primary/20 bg-transparent">
        {/* Mobile close button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 lg:mx-0 mx-auto">
          <img
            src="/google-ranker-logo.png"
            alt="Google Ranker Logo"
            className="h-20 w-auto"
          />
        </div>
        
        {/* Spacer for mobile to center the logo */}
        <div className="lg:hidden w-8"></div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={() => {
              const currentlyActive = isActive(item.href);
              return cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group",
                currentlyActive
                  ? ""
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground glass-button"
              );
            }}
            style={() => {
              const currentlyActive = isActive(item.href);
              return currentlyActive
                ? {
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.2))',
                    color: '#A78BFA',
                    borderLeft: '3px solid #8B5CF6'
                  }
                : {};
            }}
          >
            <item.icon
              className="h-5 w-5 transition-all duration-300 group-hover:scale-110"
              style={
                isActive(item.href)
                  ? { color: '#A78BFA' }
                  : {}
              }
            />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}


        {/* Settings */}
        <NavLink
          to="/dashboard/settings"
          className={() => {
            const currentlyActive = isActive("/dashboard/settings");
            return cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group",
              currentlyActive
                ? ""
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground glass-button"
            );
          }}
          style={() => {
            const currentlyActive = isActive("/dashboard/settings");
            return currentlyActive
              ? {
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.2))',
                  color: '#A78BFA',
                  borderLeft: '3px solid #8B5CF6'
                }
              : {};
          }}
        >
          <Settings
            className="h-5 w-5 transition-all duration-300 group-hover:scale-110"
            style={
              isActive("/dashboard/settings")
                ? { color: '#A78BFA' }
                : {}
            }
          />
          <span className="font-medium">Settings</span>
        </NavLink>
      </nav>

      {/* Bottom CTA Section */}
      <div className="absolute bottom-4 left-4 right-4">
        {/* Ask for Reviews */}
        <div className="bg-gradient-primary p-3 sm:p-4 rounded-lg text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquarePlus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            <h3 className="font-semibold text-sm sm:text-base text-white">Ask for Reviews</h3>
          </div>
          <p className="text-xs sm:text-sm text-white opacity-90 mb-3">
            Generate QR codes for easy reviews
          </p>
          <Link
            to="/dashboard/ask-for-reviews"
            className="block w-full"
          >
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-white bg-white/20 hover:bg-white/30 text-xs sm:text-sm border-0"
            >
              Generate QR
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;