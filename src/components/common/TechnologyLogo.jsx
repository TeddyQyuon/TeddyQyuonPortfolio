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

const logos = {
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

// Uses original Devicon brand marks where a verified logo exists. Concepts
// without a logo stay text-only instead of receiving an invented icon.
export const hasTechnologyLogo = (name) => Boolean(logos[name]);

export default function TechnologyLogo({ name, size = 18, className = '' }) {
  const src = logos[name];
  if (!src) return null;

  return (
    <img
      className={`technology-logo ${className}`.trim()}
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
