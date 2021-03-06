'use strict';
(function () {
  angular.module('app.books').directive('booksList', booksList);
  function booksList(storage, fields) {
    return {
      templateUrl: 'app/scripts/books/bookslist.view.html',
      replace: true,
      scope: {
        modelBooks: '='
      },
      link: function postLink(scope) {
        //console.log('models', scope.modelBooks);
        scope.editingIndex = null;
        scope.editModel = {};
        scope.editRows = [];
        scope.editPrev = null;
        scope.originModels = null;
        scope.fields = fields.getFormFields();
        scope.removeBook = removeBook;
        scope.edit = edit;
        scope.save = save;
        scope.reset = reset;
        scope.closeEdit = closeEdit;
        function removeBook(index) {
          scope.modelBooks.splice(index, 1);
          storage.removeBooks(index);
        }
        function edit(index) {
          scope.originModels = storage.getBooks();
          scope.editRows.push(index);
          scope.editPrev = scope.editRows[scope.editRows.length - 2];
          _.forEach(scope.modelBooks[scope.editPrev], function (value, key, item) {
            if (!value || value !== scope.originModels[scope.editPrev][key]) {
              item[key] = scope.originModels[scope.editPrev][key];
            }
          });
          scope.editingIndex = index;
          scope.editModel = angular.copy(scope.modelBooks[index]);

        }
        function save(model, index) {
          // console.log('model change', model, index);
          storage.updateBook(model, index);
          closeEdit();
        }
        function reset(index) {
          //console.log('reset', index);
          //console.log('reset', scope.editModel);
          scope.modelBooks[index] = scope.editModel;
          closeEdit();
        }
        function closeEdit() {
          scope.editingIndex = null;
        }
      }
    };
  }
})();