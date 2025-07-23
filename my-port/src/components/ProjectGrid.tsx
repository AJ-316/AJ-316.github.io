import React, { useRef } from "react";
import TiltedCard from "./TitledCard";

export interface ChromaItem {
	image: string[];
	title: string;
	altText: string;
	description: string | null;
	url?: string;
	size: number;
	radius: number;
	className?: string;
}

export interface ProjectGridProps {
	items?: ChromaItem[];
	className?: string;
	radius?: number;
	fadeOut?: number;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
	items,
	className = "",
	fadeOut = 0.6,
}) => {

	const demo: ChromaItem[] = [
		{
			image: ["https://i.pravatar.cc/300?img=8", "https://www.shutterstock.com/image-vector/background-illustration-sky-grounds-sense-600nw-2479643267.jpg", "https://i.pinimg.com/originals/8e/d7/96/8ed7960776b6862eecf092bb3df92654.jpg", "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg", "https://i.pravatar.cc/300?img=11", "https://i.pravatar.cc/300?img=3", "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", "https://i.pravatar.cc/300?img=16", "https://i.pravatar.cc/300?img=25"],
			title: "Alex Rivera",
			altText: "Full Stack Developer",
			description: "This is Full Stack Developer, built in OpenGL",
			size: 250,
			radius: 200,
		},
		{
			image: ["https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"],
			title: "Alex Rivera",
			altText: "Full Stack Developer",
			description: "Full Stack Developer",
			size: 250,
			radius: 200,
		},
		{
			image: ["https://i.pravatar.cc/300?img=11"],
			title: "Jordan Chen",
			altText: "DevOps Engineer",
			description: "DevOps Engineer",
			url: "https://linkedin.com/in/",
			size: 250,
			radius: 200,
		},
		{
			image: ["https://i.pravatar.cc/400?img=3"],
			title: "Morgan Blake",
			altText: "UI/UX Designer",
			description: "UI/UX Designer",
			url: "https://dribbble.com/",
			size: 250,
			radius: 200,
		},
		{
			image: ["https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="],
			title: "Morgan Blake",
			altText: "UI/UX Designer",
			description: "UI/UX Designer",
			url: "https://dribbble.com/",
			size: 250,
			radius: 200,
		},
		{
			image: ["https://i.pravatar.cc/300?img=16"],
			title: "Casey Park",
			altText: "Data Scientist",
			description: "Data Scientist",
			url: "https://kaggle.com/",
			size: 250,
			radius: 200,
		},
		{
			image: ["https://i.pravatar.cc/300?img=25"],
			title: "Sam Kim",
			altText: "Mobile Developer",
			description: "Mobile Developer",
			url: "https://github.com/",
			size: 250,
			radius: 200,
		},
		{
			image: ["https://i.pravatar.cc/300?img=60"],
			title: "Tyler Rodriguez",
			altText: "Cloud Architect",
			description: "Cloud Architect",
			url: "https://aws.amazon.com/",
			size: 250,
			radius: 200,
		},
	];

	const data = items?.length ? items : demo;

	const handleGlobalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const element = document.elementFromPoint(e.clientX, e.clientY);

		// Traverse upward to find the parent article with spotlight
		const article = element?.closest("figure");

		if (article) {
			const rect = article.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			// Set local CSS vars on the hovered article only
			article.style.setProperty("--mouse-x", `${x}px`);
			article.style.setProperty("--mouse-y", `${y}px`);
		}
	};

	return (
		<div
			className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 z-0 ${className}`}
			onMouseMove={handleGlobalMouseMove}
		>
			{/* Looping through items -> create article element */}
			{data.map((c, i) => (
				<TiltedCard
					key={i}
					containerWidth={c.size}
					imageSrc={c.image}
					clickUrl={c.url}
					altText={c.altText}
					rotateAmplitude={12}
					scaleOnHover={1.2}
					showMobileWarning={false}
					displayOverlayContent={true}
					fadeOut={fadeOut}
					radius={c.radius}
					showViewButton={c.description != null}
					showBorder={false}
					overlayContent={
						<p className={` ${c.className} absolute text-white transition-all w-fit bg-[#000000A0] group-hover:bg-transparent rounded-lg m-2 p-1 bottom-0 text-[0.5rem]`}>
							<h1 className="font-bold">{c.title}</h1>
							{c.description && <p className="py-1 text-[0.4rem]">{c.description}</p>}
						</p>
					}
				/>
			))}
		</div>
	);
};

export default ProjectGrid;
/*

<article
	key={i}
	onPointerMove={e => handleMove(e, i)}
	onPointerLeave={_ => handleLeave(i)}
	onClick={() => handleCardClick(c.url)}
	className="group relative flex flex-col w-[30%] rounded-lg overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"
	style={
		{
			"--card-border": c.borderColor || "transparent",
			background: c.gradient,
			"--spotlight-color": "rgba(255,255,255,0.3)",
			"--r": `${radius}px`,
		} as React.CSSProperties
	}
>
	<div
		className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
		style={{
			background:
				"radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
		}}
	/>
	<div className="relative z-10 flex-1 p-[10px] box-border">
		<img
			src={c.image}
			alt={c.title}
			loading="lazy"
			className="w-full h-full object-cover rounded-lg"
		/>
	</div>
	<footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
		<h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
		{c.handle && (
			<span className="text-[0.95rem] opacity-80 text-right">
				{c.handle}
			</span>
		)}
		<p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
		{c.location && (
			<span className="text-[0.85rem] opacity-85 text-right">
				{c.location}
			</span>
		)}
	</footer>

	<div
		className="absolute inset-0 pointer-events-none z-30"
		style={{
			backdropFilter: "grayscale(1) brightness(0.78)",
			WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
			background: "rgba(0,0,0,0.001)",
			maskImage:
				"radial-gradient(circle var(--r, 150px) at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)",
			WebkitMaskImage:
				"radial-gradient(circle var(--r, 150px) at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)",
		}}
	/>
	<div
		className="absolute inset-0 pointer-events-none transition-opacity duration-[0ms] z-40"
		ref={(el) => { fadeRef.current[i] = el; }}
		style={{
			backdropFilter: "grayscale(1) brightness(0.78)",
			WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
			background: "rgba(0,0,0,0.001)",
			maskImage:
				"radial-gradient(circle var(--r, 150px) at var(--mouse-x) var(--mouse-y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)",
			WebkitMaskImage:
				"radial-gradient(circle var(--r, 150px) at var(--mouse-x) var(--mouse-y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)",
		}}
	/>

</article>
*/