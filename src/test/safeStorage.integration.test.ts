import { describe, it, expect, beforeEach, vi } from 'vitest';
import { safeStorage } from '../lib/safeStorage';
import type { Project } from '../data/projects';

// Sample project data for testing
const sampleProjects: Project[] = [
  {
    id: 1,
    title: "Test Project",
    description: "A test project for localStorage functionality",
    image: "/test-image.png",
    tags: ["React", "TypeScript"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/test/project",
    category: 'frontend',
  },
  {
    id: 2,
    title: "Another Test Project",
    description: "Another test project",
    image: "/test-image-2.png",
    tags: ["WordPress", "PHP"],
    demoUrl: "https://example2.com",
    githubUrl: "https://github.com/test/project2",
    category: 'wordpress',
  }
];

describe('safeStorage Integration Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('should handle project data storage and retrieval correctly', () => {
    // Test storing projects
    safeStorage.setItem('projects', sampleProjects);
    
    // Test retrieving projects
    const retrievedProjects = safeStorage.getItem<Project[]>('projects', []);
    
    expect(retrievedProjects).toEqual(sampleProjects);
    expect(retrievedProjects).toHaveLength(2);
    expect(retrievedProjects[0].title).toBe('Test Project');
    expect(retrievedProjects[1].category).toBe('wordpress');
  });

  it('should return default projects when localStorage is empty', () => {
    const defaultProjects: Project[] = [
      {
        id: 999,
        title: "Default Project",
        description: "Default project when localStorage is empty",
        image: "/default.png",
        tags: ["Default"],
        demoUrl: "https://default.com",
        githubUrl: "https://github.com/default",
        category: 'frontend',
      }
    ];

    const retrievedProjects = safeStorage.getItem('projects', defaultProjects);
    
    expect(retrievedProjects).toEqual(defaultProjects);
    expect(retrievedProjects[0].title).toBe('Default Project');
  });

  it('should handle complex project data with all properties', () => {
    const complexProject: Project = {
      id: 123,
      title: "Complex Project with Special Characters & Symbols",
      description: "A project with émojis 🚀, special chars & complex data structures",
      image: "/complex-image.png",
      tags: ["React", "TypeScript", "SCSS", "FramerMotion", "Redux"],
      demoUrl: "https://complex-project.netlify.app/",
      githubUrl: "https://github.com/user/complex-project",
      category: 'frontend',
    };

    safeStorage.setItem('complexProject', complexProject);
    const retrieved = safeStorage.getItem<Project>('complexProject', {} as Project);
    
    expect(retrieved).toEqual(complexProject);
    expect(retrieved.description).toContain('émojis 🚀');
    expect(retrieved.tags).toHaveLength(5);
  });

  it('should handle localStorage quota exceeded gracefully', () => {
    // Mock localStorage to throw quota exceeded error
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = vi.fn(() => {
      throw new Error('QuotaExceededError: localStorage quota exceeded');
    });

    // Should not throw error
    expect(() => {
      safeStorage.setItem('projects', sampleProjects);
    }).not.toThrow();

    // Restore original method
    Storage.prototype.setItem = originalSetItem;
  });

  it('should maintain type safety with TypeScript', () => {
    // This test verifies TypeScript compilation and type safety
    safeStorage.setItem<Project[]>('typedProjects', sampleProjects);
    
    const typedProjects = safeStorage.getItem<Project[]>('typedProjects', []);
    
    // TypeScript should infer the correct types
    expect(typeof typedProjects[0]?.id).toBe('number');
    expect(typeof typedProjects[0]?.title).toBe('string');
    expect(Array.isArray(typedProjects[0]?.tags)).toBe(true);
  });
});