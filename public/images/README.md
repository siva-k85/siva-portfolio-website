# Portfolio Images Directory Structure

## 📁 Directory Organization

### `/profile/`
- **siva-profile.jpg** - Your main profile photo (recommended: 500x500px, optimized)
- **siva-avatar.jpg** - Smaller avatar version (recommended: 200x200px)

### `/projects/`
Add screenshots for each project:
- **acgme-dashboard.png** - ACGME Compliance Dashboard
- **sepsis-command-center.png** - Sepsis Command Center
- **value-based-care.png** - Value-Based Care Modeling
- **oncology-workflow.png** - Precision Oncology Workflow
- **ems-optimization.png** - EMS Resource Optimization
- **predictive-analytics.png** - Predictive Analytics Platform

### `/certifications/`
Add your certification badges:
- **cmu-degree.png** - Carnegie Mellon degree/certificate
- **epic-certification.png** - Epic certifications
- **tableau-certification.png** - Tableau certifications
- **aws-certification.png** - AWS certifications (if any)

### `/skills/`
Technology/tool logos:
- **python-logo.svg**
- **sql-logo.svg**
- **tableau-logo.svg**
- **epic-logo.png**
- **aws-logo.svg**

### `/companies/`
Company/institution logos:
- **cmu-logo.png** - Carnegie Mellon University
- **upmc-logo.png** - UPMC (if applicable)
- Other healthcare organizations

### `/blog/`
Images for blog posts/notes

## 🎨 Image Guidelines

### Optimization Requirements:
- **Format**: Use WebP for best performance, fallback to JPG/PNG
- **Size**: Keep under 200KB per image
- **Dimensions**:
  - Hero images: 1920x1080px max
  - Project screenshots: 1200x800px
  - Profile photo: 500x500px
  - Thumbnails: 400x300px

### Naming Convention:
- Use lowercase with hyphens: `project-name-screenshot.jpg`
- Be descriptive: `acgme-compliance-dashboard.png`
- Include version if needed: `sepsis-v2-screenshot.png`

## 📝 Next Steps to Add Your Images:

1. **Profile Photo** (REQUIRED):
   ```bash
   # Add your profile photo as:
   public/images/profile/siva-profile.jpg
   ```

2. **Project Screenshots** (HIGHLY RECOMMENDED):
   ```bash
   # Add at least one screenshot per project:
   public/images/projects/[project-name].png
   ```

3. **Update Component References**:
   The components currently reference these paths:
   - Hero: `/images/profile/siva-profile.jpg`
   - Projects: `/images/projects/[project-slug].png`

4. **Optimize Images**:
   ```bash
   # Use an online tool or ImageMagick:
   convert original.jpg -quality 85 -resize 1200x800 optimized.jpg
   ```