export default class FileUploader extends EventTarget {
  constructor(containerId) {
    super();
    this.containerId = containerId;
  }

  readFile(file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event) => {
      this.currentFile = event.target.result;
      this.dispatchEvent(new Event('fileLoaded'));
    };
  }

  render() {
    const container = document.getElementById(this.containerId);

    // file input
    const fileUploader = container.querySelector('.fileInput');
    fileUploader.onchange = () => {
      this.readFile(fileUploader.files[0]);
      fileUploader.value = '';
    };

    // drop zone
    const dropArea = container.querySelector('.dropzone');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropArea.addEventListener(
        eventName,
        (event) => {
          event.preventDefault();
          event.stopPropagation();
        },
        false,
      );
    });

    dropArea.addEventListener('drop', (event) => {
      this.readFile(event.dataTransfer.files[0]);
    });
  }
}
