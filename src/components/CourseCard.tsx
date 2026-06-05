import React from 'react';
import { Star, Clock, Calendar, Users, ChevronRight, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { INSTRUCTORS } from '../data';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
}

export default function CourseCard({ course, onSelect }: CourseCardProps) {
  // Find associated instructor
  const instructor = INSTRUCTORS.find(inst => inst.id === course.instructorId);

  return (
    <div 
      id={`course-card-${course.id}`}
      onClick={() => onSelect(course)}
      className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img 
          src={course.thumbnailUrl} 
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded">
          {course.format}
        </div>
        
        {/* Rating overlay for visual pop */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
          <span className="text-xs font-black text-navy-950">{course.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 text-left">
        {/* Category & Level Badges */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest font-mono bg-amber-50 px-2 py-0.5 rounded">
            {course.category}
          </span>
          <span className="text-[10px] font-bold text-gray-400 capitalize">
            {course.level}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-base font-extrabold text-navy-950 font-sans tracking-tight leading-snug group-hover:text-amber-600 transition-colors line-clamp-1">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 pb-4 border-b border-gray-50 line-clamp-2 leading-relaxed min-h-[32px]">
          {course.subtitle}
        </p>

        {/* Instructor */}
        {instructor && (
          <div className="flex items-center gap-2.5 my-3.5">
            <img 
              src={instructor.imageUrl} 
              alt={instructor.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover border border-gray-100"
            />
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-400 leading-none">Instructor</span>
              <span className="text-xs font-bold text-navy-950 leading-tight mt-0.5">
                {instructor.name}
              </span>
            </div>
          </div>
        )}

        {/* Metadata Details Row */}
        <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-3 text-[11px] text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{course.durationWeeks} Weeks ({course.durationHours} hrs)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            {course.cohortDates && course.cohortDates.length > 0 ? (
              <span className="truncate">Starts {course.cohortDates[0]}</span>
            ) : (
              <span>Instant Access</span>
            )}
          </div>
        </div>

        {/* Price and Action Button footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            {course.oldPrice && (
              <span className="text-[11px] text-gray-400 line-through leading-none mb-0.5">
                ₦{course.oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-base font-extrabold text-navy-950 leading-none font-mono">
              ₦{course.price.toLocaleString()}
            </span>
          </div>

          <span className="text-xs font-extrabold text-[#F59E0B] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
            View details <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
