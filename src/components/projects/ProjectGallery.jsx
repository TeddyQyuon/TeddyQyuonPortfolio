// The first verified project figure leads the case study. The complete figure
// list at the end links to each unmodified, full-size source image.
export default function ProjectGallery({ screenshots = [], mode = 'list' }) {
  if (!screenshots.length) return null;

  if (mode === 'lead') {
    const figure = screenshots[0];
    return (
      <figure className="case-lead-figure">
        <a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size figure: ${figure.alt}`}>
          <img src={figure.src} alt={figure.alt} />
        </a>
        {figure.caption && <figcaption>{figure.caption}</figcaption>}
      </figure>
    );
  }

  return (
    <ol className="case-figure-list">
      {screenshots.map((figure, index) => (
        <li key={figure.src}>
          <a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={`Open figure ${index + 1} at full size: ${figure.alt}`}>
            <strong>Figure {index + 1}</strong>
            <span>{figure.caption || figure.alt}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
