export default class LibraryController {

  constructor ($state) {
    this.$state = $state;
    this.setView('list');
  }

  setView (subView) {
    this.view = subView;
    this.$state.go(`library.${subView}`);
  }

  getView () {
    return this.view;
  }

}
