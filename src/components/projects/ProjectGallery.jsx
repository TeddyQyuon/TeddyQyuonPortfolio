import { ImageList, ImageListItem, Box } from '@mui/material';

// Responsive screenshot gallery. Renders nothing when there are no images.
export default function ProjectGallery({ screenshots }) {
  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <ImageList
      cols={screenshots.length === 1 ? 1 : 2}
      gap={16}
      sx={{ width: '100%' }}
    >
      {screenshots.map((shot) => (
        <ImageListItem key={shot.src}>
          <Box
            component="img"
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}