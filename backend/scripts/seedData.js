const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Therapist = require('../models/Therapist');
require('dotenv').config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/therapy-platform');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Therapist.deleteMany({});
        console.log('Cleared existing data');

        // Create demo users
        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = [
            {
                name: 'Demo Client',
                email: 'client@demo.com',
                phone: '+1234567890',
                password: hashedPassword,
                role: 'client'
            },
            {
                name: 'Demo Therapist',
                email: 'therapist@demo.com',
                phone: '+1234567891',
                password: hashedPassword,
                role: 'therapist'
            },
            {
                name: 'Demo Admin',
                email: 'admin@demo.com',
                phone: '+1234567892',
                password: hashedPassword,
                role: 'admin'
            }
        ];

        await User.insertMany(users);
        console.log('Created demo users');

        // Create demo therapists
        const therapists = [
            {
                name: 'Dr. Sarah Johnson',
                specialization: 'Anxiety & Depression',
                whatsapp: '1234567890',
                languages: ['English', 'Spanish'],
                bio: 'Licensed clinical psychologist with 10+ years of experience specializing in anxiety, depression, and trauma therapy. I use evidence-based approaches including CBT and mindfulness techniques.',
                status: 'active'
            },
            {
                name: 'Dr. Michael Chen',
                specialization: 'Relationship Counseling',
                whatsapp: '1234567891',
                languages: ['English', 'Mandarin'],
                bio: 'Marriage and family therapist helping couples and individuals navigate relationship challenges. Specialized in communication skills and conflict resolution.',
                status: 'active'
            },
            {
                name: 'Dr. Emily Rodriguez',
                specialization: 'Addiction Recovery',
                whatsapp: '1234567892',
                languages: ['English', 'Spanish', 'Portuguese'],
                bio: 'Addiction counselor with expertise in substance abuse recovery, behavioral addictions, and dual diagnosis treatment. Compassionate, non-judgmental approach.',
                status: 'active'
            },
            {
                name: 'Dr. David Kim',
                specialization: 'Child & Adolescent Therapy',
                whatsapp: '1234567893',
                languages: ['English', 'Korean'],
                bio: 'Child psychologist specializing in developmental issues, ADHD, autism spectrum disorders, and family therapy. Creating safe spaces for young minds to heal and grow.',
                status: 'active'
            },
            {
                name: 'Dr. Lisa Thompson',
                specialization: 'Trauma & PTSD',
                whatsapp: '1234567894',
                languages: ['English', 'French'],
                bio: 'Trauma specialist using EMDR, somatic therapy, and other evidence-based treatments for PTSD, complex trauma, and dissociative disorders.',
                status: 'active'
            },
            {
                name: 'Dr. Ahmed Hassan',
                specialization: 'Stress Management',
                whatsapp: '1234567895',
                languages: ['English', 'Arabic', 'French'],
                bio: 'Stress management expert helping professionals and students cope with work-life balance, burnout, and performance anxiety through mindfulness and cognitive techniques.',
                status: 'active'
            }
        ];

        await Therapist.insertMany(therapists);
        console.log('Created demo therapists');

        console.log('Seed data created successfully!');
        console.log('\nDemo login credentials:');
        console.log('Client: client@demo.com / password123');
        console.log('Therapist: therapist@demo.com / password123');
        console.log('Admin: admin@demo.com / password123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();