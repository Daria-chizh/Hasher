import HasherWorker from './hasher.worker';
import HashSelector from './HashSelector';
import FileUploader from './FileUploader';

const hasherWorker = new HasherWorker();

const hashElement = document.querySelector('#calculated > span');
hasherWorker.addEventListener('message', (event) => {
  hashElement.textContent = event.data.hash;
});

const hashSelector = new HashSelector('hashAlgorithm');
const fileUploader = new FileUploader('fileUploader');

const recalculateHash = () => {
  const hash = hashSelector.selectedHash;
  const file = fileUploader.currentFile;
  if (!hash || !file) {
    return;
  }

  hasherWorker.postMessage({ hash, file });
};

hashSelector.addEventListener('hashChanged', () => recalculateHash());
fileUploader.addEventListener('fileLoaded', () => recalculateHash());

hashSelector.render();
fileUploader.render();
