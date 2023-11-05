# Sembox

A drive with intelligent semantic searching.

For example, when you search for dog, it will bring up pictures, audios, texts... that contain dog.

Built during Calhacks 10.0 (2023)

## Components

Look at each component for more information

- [Frontend](./semantic-drive-frontend)
- [API](./semantic-drive-backend)
- [DB](./semantic-drive-database)

## Potential Improvements

- better models
  - custom summary models (especially text)
    - Currently - size constraints for my hardware
    - Also can get faster inference times with gpu
  - better search model
    - Can be much better - currently, just cosine similarity
- better ui
  - light theme
  - better metadata display
  - lots of clean up (e.g. Loading)
  - User management
