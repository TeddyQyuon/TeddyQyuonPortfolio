import axiosLogo from '../../assets/images/technology/axios.svg';
import expressLogo from '../../assets/images/technology/express.svg';
import gitLogo from '../../assets/images/technology/git.svg';
import githubLogo from '../../assets/images/technology/github.svg';
import javascriptLogo from '../../assets/images/technology/javascript.svg';
import materialUiLogo from '../../assets/images/technology/materialui.svg';
import mysqlLogo from '../../assets/images/technology/mysql.svg';
import nodeLogo from '../../assets/images/technology/nodejs.svg';
import npmLogo from '../../assets/images/technology/npm.svg';
import postmanLogo from '../../assets/images/technology/postman.svg';
import pythonLogo from '../../assets/images/technology/python.svg';
import reactLogo from '../../assets/images/technology/react.svg';
import sequelizeLogo from '../../assets/images/technology/sequelize.svg';
import viteLogo from '../../assets/images/technology/vitejs.svg';
import vscodeLogo from '../../assets/images/technology/vscode.svg';
import djangoLogo from '../../assets/images/technology/django.svg';
import fastapiLogo from '../../assets/images/technology/fastapi.svg';
import postgresLogo from '../../assets/images/technology/postgresql.svg';
import numpyLogo from '../../assets/images/technology/numpy.svg';
import pandasLogo from '../../assets/images/technology/pandas.svg';
import pytorchLogo from '../../assets/images/technology/pytorch.svg';
import tailwindLogo from '../../assets/images/technology/tailwindcss.svg';
import typescriptLogo from '../../assets/images/technology/typescript.svg';
import sqliteLogo from '../../assets/images/technology/sqlite.svg';
import routerLogo from '../../assets/images/technology/reactrouter.svg';
import vercelLogo from '../../assets/images/technology/vercel.svg';
import htmlLogo from '../../assets/images/technology/html5.svg';
import cssLogo from '../../assets/images/technology/css3.svg';
import stripeLogo from '../../assets/images/technology/stripe.svg';
import knimeLogo from '../../assets/images/technology/knime.svg';
import spotifyLogo from '../../assets/images/technology/spotify.svg';
import sqlalchemyLogo from '../../assets/images/technology/sqlalchemy.svg';
import sklearnLogo from '../../assets/images/technology/scikitlearn.svg';
import pytestLogo from '../../assets/images/technology/pytest.svg';
import mlflowLogo from '../../assets/images/technology/mlflow.svg';
import sasLogo from '../../assets/images/technology/sas.png';

const logos = {
  Django: djangoLogo, FastAPI: fastapiLogo, PostgreSQL: postgresLogo,
  NumPy: numpyLogo, pandas: pandasLogo, PyTorch: pytorchLogo,
  'Tailwind CSS': tailwindLogo, TypeScript: typescriptLogo, SQLite: sqliteLogo,
  'React Router': routerLogo, Vercel: vercelLogo, HTML: htmlLogo, CSS: cssLogo,
  Stripe: stripeLogo, KNIME: knimeLogo, 'Spotify Web API': spotifyLogo,
  SQLAlchemy: sqlalchemyLogo, 'scikit-learn': sklearnLogo, pytest: pytestLogo,
  MLflow: mlflowLogo, 'SAS Viya': sasLogo, SAS: sasLogo,
  Axios: axiosLogo,
  'Express.js': expressLogo,
  Express: expressLogo,
  Git: gitLogo,
  GitHub: githubLogo,
  JavaScript: javascriptLogo,
  'Material UI': materialUiLogo,
  MUI: materialUiLogo,
  MySQL: mysqlLogo,
  'MySQL Workbench': mysqlLogo,
  'Node.js': nodeLogo,
  npm: npmLogo,
  Postman: postmanLogo,
  Python: pythonLogo,
  React: reactLogo,
  'React Hooks': reactLogo,
  'Sequelize ORM': sequelizeLogo,
  Sequelize: sequelizeLogo,
  Vite: viteLogo,
  'VS Code': vscodeLogo,
};

// Uses sourced brand marks where a verified logo exists. Concepts
// without a logo stay text-only instead of receiving an invented icon.
export const hasTechnologyLogo = (name) => Boolean(logos[name]);

export default function TechnologyLogo({ name, size = 18, className = '' }) {
  const src = logos[name];
  if (!src) return null;

  return (
    <img
      className={`technology-logo technology-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')} ${className}`.trim()}
      src={src}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
  );
}
