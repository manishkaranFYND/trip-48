import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, Search, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 opacity-90" />
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Weekend
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Quest
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover epic weekend adventures tailored to your budget, group size, and location. 
            Turn every weekend into an unforgettable quest!
          </p>
        </div>

        <div className="animate-fade-in bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Where to?" 
                className="pl-11 h-12 border-0 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Group size" 
                className="pl-11 h-12 border-0 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Duration" 
                className="pl-11 h-12 border-0 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            
            <Button className="h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold">
              <Search className="mr-2 h-5 w-5" />
              Find Quests
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            💡 Pro tip: Start with your current location for the best recommendations
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Personalized</h3>
            <p className="text-blue-100">Quests tailored to your preferences and budget</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Social</h3>
            <p className="text-blue-100">Perfect for groups, couples, or solo adventurers</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Gamified</h3>
            <p className="text-blue-100">Complete challenges and earn achievement badges</p>
          </div>
        </div>
      </div>
    </div>
  );
}
