import { Link } from 'react-router-dom';
import Icon from '../components/common/Icon';
import useDocumentMeta from '../hooks/useDocumentMeta';

export default function NotFoundPage() {
  useDocumentMeta({ title: 'Page not found', description: 'This page does not exist.' });
  return (
    <section className="container section not-found" aria-labelledby="nf-title">
      <div className="panel">
        <p className="mono panel-label">status: 404</p>
        <h1 id="nf-title">Page not found</h1>
        <p className="muted">The link may be outdated or mistyped.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/">
            <Icon name="arrowLeft" size={16} />
            Back to overview
          </Link>
          <Link className="btn" to={{ pathname: '/', hash: '#projects' }}>All projects</Link>
        </div>
      </div>
    </section>
  );
}
