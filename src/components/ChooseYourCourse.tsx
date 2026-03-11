"use client";

import { useState } from "react";
import { ChevronDown, Star, Users, Code, Bot, Calculator, Brain, BookOpen, FlaskConical, Wrench, LayoutGrid } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Types ---
type Category = "Coding" | "Robotics" | "Financial Literacy" | "Gen AI" | "Math" | "English" | "Science" | "DIY";

interface Course {
    id: string;
    title: string;
    category: Category;
    gradeGroup: "Grade 1-3" | "Grade 4-6" | "Grade 7-9" | "Grade 10-12";
    imageColor: string;
    icon: React.ReactNode;
    enrolled: number;
    rating: number;
    reviews: number;
    students: number;
    tags: string[];
    level: string; // "Intro to Coding", "Game & App Creation"
}

// --- Mock Data ---
const CATEGORIES: { name: Category; icon?: React.ReactNode }[] = [
    { name: "Coding", icon: <Code size={18} /> },
    { name: "Robotics", icon: <Bot size={18} /> },
    { name: "Financial Literacy", icon: <Calculator size={18} /> },
    { name: "Gen AI", icon: <Brain size={18} /> },
    { name: "Math", icon: <Calculator size={18} /> },
    { name: "English", icon: <BookOpen size={18} /> },
    { name: "Science", icon: <FlaskConical size={18} /> },
    { name: "DIY", icon: <Wrench size={18} /> },
];

const GRADES = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7-9", "Grade 10-12"];

const COURSES: Course[] = [
    {
        id: "1",
        title: "Coding Champion I - Group",
        category: "Coding",
        gradeGroup: "Grade 1-3",
        imageColor: "bg-blue-100",
        icon: <Code className="text-orange-500 w-12 h-12" />,
        enrolled: 52,
        rating: 4.67,
        reviews: 312,
        students: 52,
        tags: ["Group"],
        level: "Intro to Coding"
    },
    {
        id: "2",
        title: "Coding Achiever I - Group",
        category: "Coding",
        gradeGroup: "Grade 1-3",
        imageColor: "bg-indigo-100",
        icon: <Code className="text-blue-600 w-12 h-12" />,
        enrolled: 1091,
        rating: 4.64,
        reviews: 3960,
        students: 1091,
        tags: ["Group"],
        level: "Game & App Creation"
    },
    {
        id: "3",
        title: "Coding Accelerator I - Group",
        category: "Coding",
        gradeGroup: "Grade 1-3",
        imageColor: "bg-yellow-100",
        icon: <Code className="text-yellow-600 w-12 h-12" />,
        enrolled: 49,
        rating: 4.85,
        reviews: 605,
        students: 49,
        tags: ["Group"],
        level: "Coding Basics"
    },
    // Add a few more placeholders for other categories to demonstrate filtering
    {
        id: "4",
        title: "Robo Master I - Group",
        category: "Robotics",
        gradeGroup: "Grade 1-3",
        imageColor: "bg-orange-100",
        icon: <Bot className="text-gray-700 w-12 h-12" />,
        enrolled: 120,
        rating: 4.9,
        reviews: 150,
        students: 120,
        tags: ["Group"],
        level: "Intro to Robots"
    },
];

const ChooseYourCourse = () => {
    const [selectedGrade, setSelectedGrade] = useState("Grade 1");
    const [selectedCategory, setSelectedCategory] = useState<Category>("Coding");

    // Filter logic (simplified for demo)
    // In a real app, we'd map specific grades to grade groups
    const filteredCourses = COURSES.filter(course => course.category === selectedCategory);

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 left-20 opacity-20 pointer-events-none">
                <img src="/media/question.gif" className="w-24" alt="" />
            </div>
            <div className="absolute bottom-10 right-10 opacity-25 pointer-events-none">
                <img src="/media/planets.gif" className="w-32" alt="" />
            </div>
            <div className="absolute top-10 right-20 opacity-15 pointer-events-none">
                <img src="/media/arrows.gif" className="w-20 -rotate-12" alt="" />
            </div>
            <div className="absolute bottom-40 left-10 opacity-15 pointer-events-none">
                <img src="/media/stars.gif" className="w-24" alt="" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        {/* Decorative icons handled via CSS or absolute positioning usually, simplistic here */}
                        <div className="hidden md:block absolute left-1/4 animate-bounce duration-1000">
                            <LayoutGrid className="text-gray-200 w-12 h-12 rotate-12" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Course</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Exciting and effective programs, curated by experts!
                    </p>

                    {/* Grade Selector */}
                    <div className="inline-flex items-center bg-gray-50 rounded-full px-6 py-2 border border-gray-200 shadow-sm relative group cursor-pointer hover:border-blue-400 transition-colors">
                        <span className="font-semibold text-gray-800 mr-3">Select Your Child&apos;s Grade</span>
                        <div className="relative">
                            <select
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                className="appearance-none bg-transparent font-bold text-blue-600 pr-8 focus:outline-none cursor-pointer"
                            >
                                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex overflow-x-auto pb-4 mb-8 border-b border-gray-200 no-scrollbar gap-8 justify-start md:justify-center">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={cn(
                                "flex items-center gap-2 whitespace-nowrap py-4 px-2 border-b-2 transition-all font-semibold text-sm sm:text-base",
                                selectedCategory === cat.name
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                            )}
                        >
                            {/* Colorful icon only when active or hovered? Keeping simplistic for now */}
                            <span className={selectedCategory === cat.name ? "text-yellow-500" : ""}>{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                    <button className="flex items-center gap-2 whitespace-nowrap py-4 px-2 text-blue-600 font-bold hover:text-blue-800">
                        <LayoutGrid size={18} /> View All
                    </button>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <div key={course.id} className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                                {/* Card Header / Image Area */}
                                <div className={`${course.imageColor} p-8 flex flex-col items-center justify-center relative h-48`}>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-700 flex items-center gap-1">
                                        <Users size={12} /> {course.enrolled}+ Enrolled
                                    </div>
                                    <div className="transform scale-150 drop-shadow-lg">
                                        {course.icon}
                                    </div>
                                    <div className="absolute bottom-4 left-4 flex gap-2">
                                        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-600">{course.level}</span>
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        {course.tags.map(tag => (
                                            <span key={tag} className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-600">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate" title={course.title}>{course.title}</h3>

                                    <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                            <Star size={16} fill="currentColor" />
                                            <span className="text-gray-900">{course.rating}</span>
                                            <span className="text-gray-400 font-normal">({course.reviews} ratings)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users size={16} /> {course.students} students
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-400 mt-2">Introduction to Coding for Kids</p>

                                    <button className="w-full mt-4 py-3 rounded-xl border-2 border-blue-100 text-blue-600 font-bold hover:bg-blue-50 transition-colors">
                                        See Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500 text-lg">No courses found for this category yet.</p>
                            <p className="text-gray-400 text-sm">Try switching back to &apos;Coding&apos; to see the mock data.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ChooseYourCourse;
