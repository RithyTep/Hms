#!/bin/bash

# Run the build
next build

# Check if we're on Vercel and need the workaround 
if [ -n "$VERCEL" ] && [ "$VERCEL" = "1" ]; then
  echo "Creating empty client-reference-manifest files to bypass errors..."
  
  # Create an empty client reference manifest file for the dashboard page
  mkdir -p .next/server/app/\(dashboard\)
  touch .next/server/app/\(dashboard\)/page_client-reference-manifest.js
  
  # Create any other missing manifests if needed
  # touch .next/server/app/other-path/page_client-reference-manifest.js
fi

# Continue with the rest of the deployment
echo "Build completed with workarounds applied"
