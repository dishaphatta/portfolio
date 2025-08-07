"use client"

export default function CSSGradientBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        {/* Orb 1 */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 100%)",
            animation: "float1 20s ease-in-out infinite",
            top: "10%",
            left: "10%",
          }}
        />

        {/* Orb 2 */}
        <div
          className="absolute w-80 h-80 rounded-full opacity-25 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)",
            animation: "float2 25s ease-in-out infinite",
            top: "60%",
            right: "15%",
          }}
        />

        {/* Orb 3 */}
        <div
          className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
            animation: "float3 30s ease-in-out infinite",
            bottom: "20%",
            left: "20%",
          }}
        />

        {/* Orb 4 */}
        <div
          className="absolute w-64 h-64 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)",
            animation: "float4 22s ease-in-out infinite",
            top: "30%",
            right: "30%",
          }}
        />

        {/* Orb 5 */}
        <div
          className="absolute w-56 h-56 rounded-full opacity-18 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)",
            animation: "float5 28s ease-in-out infinite",
            bottom: "40%",
            right: "10%",
          }}
        />
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5" />

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 30px) scale(0.9); }
          75% { transform: translate(20px, 10px) scale(1.05); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 20px) scale(1.08); }
          66% { transform: translate(15px, -25px) scale(0.95); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(20px, 15px) scale(1.12); }
          40% { transform: translate(-15px, -20px) scale(0.88); }
          60% { transform: translate(25px, 5px) scale(1.05); }
          80% { transform: translate(-10px, 20px) scale(0.98); }
        }
        
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(-20px, -15px) scale(1.15); }
          70% { transform: translate(25px, 20px) scale(0.92); }
        }
        
        @keyframes float5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(15px, -25px) scale(1.08); }
          50% { transform: translate(-30px, 10px) scale(0.95); }
          75% { transform: translate(10px, 25px) scale(1.12); }
        }
      `}</style>
    </div>
  )
}
