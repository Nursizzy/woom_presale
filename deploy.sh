#!/bin/bash

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# The build output will be in the 'out' directory
echo "Build complete! Files are in the 'out' directory"

# Instructions for deployment
echo ""
echo "Deployment instructions:"
echo "1. The static files are now in the 'out' directory"
echo "2. Upload all contents of the 'out' directory to your ps.kz hosting /httpdocs folder"
echo "3. Make sure your hosting is configured to serve index.html as the default page"