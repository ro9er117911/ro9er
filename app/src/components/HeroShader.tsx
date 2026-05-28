import { ChromaFlow, FilmGrain, FlutedGlass, Shader, Swirl } from "shaders/react";

export function HeroShader() {
  return (
    <div className="shader-stage absolute inset-0 z-10 pointer-events-none opacity-80 mix-blend-screen" aria-hidden="true">
      <Shader className="h-full w-full" disableTelemetry colorSpace="srgb" toneMapping="neutral">
        <Swirl colorA="#10130f" colorB="#060706" detail={1.7} speed={0.35} />
        <ChromaFlow
          baseColor="#11140f"
          downColor="#ff5f03"
          leftColor="#ff5f03"
          rightColor="#ff5f03"
          upColor="#ff5f03"
          momentum={13}
          radius={3.5}
          intensity={0.82}
          opacity={0.5}
          blendMode="screen"
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.18}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
          opacity={0.42}
        />
        <FilmGrain strength={0.05} animated opacity={0.35} />
      </Shader>
    </div>
  );
}
