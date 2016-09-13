/*global angular */
/*global console */
/*global getElementById */
/*global alert */

var myApp = angular.module('trrApp', ['ngRoute', 'ngMessages', 'ngAnimate', 'ui.bootstrap']);
myApp.config(function ($routeProvider) {
  'use strict';
  $routeProvider
    .when('/register', {
      templateUrl: 'pages/register.html',
      controller: 'registerController',
		  reloadOnSearch: false
    })

    .when('/home', {
      templateUrl: 'pages/home.html',
      controller: 'homeController'
    });
});

myApp.service('nameService', function () {
	'use strict';
	var self = this;
	this.name = '';
	this.namelength = function () { return self.name.length; };
});

myApp.factory('$localStorage', [
	'$window', function ($window) {
    'use strict';
    var x, y;
		return {
			setObject: function (x, y) {
        $window.localStorage[x] = JSON.stringify(y);
				if (y) {
          console.log('setLocalData data.length :' + y.length);
        }
			},
			getObject: function (x) {
				x = JSON.parse($window.localStorage[x] || null);
        if (x) {
          console.log('getLocalData data.length :' + x.length);
          return x;
        }
			}
		};
	}
]);

myApp.directive('showErrors', function ($timeout) {
  'use strict';
	return {
		restrict: 'A',
		require: '^form',
		link: function (scope, el, attrs, formCtrl) {
			
			// get the text box element using the query on the name attribute
			var inputEl = el[0].querySelector('[name]');
			
			// convert the native text box element to an angular element
			var inputNgEl = angular.element(inputEl);
			
			// get the name on the text box so we know the property to check
			// on the form controller
			var inputName = inputNgEl.attr('name');
			
			// apply the has-error class when user moves to the next item
			inputNgEl.bind('blur', function () {
				console.log('showErrors blur: [ ' + inputName + ' ] $invalid: ' + formCtrl[inputName].$invalid + ' $dirty: ' + formCtrl[inputName].$dirty);
				el.toggleClass('has-error', formCtrl[inputName].$invalid && formCtrl[inputName].$dirty);
			});
			
			scope.$on('show-errors-change', function () {
				console.log('on show-errors-change: [ ' + inputName + ' ] $invalid: ' + formCtrl[inputName].$invalid + ' $dirty: ' + formCtrl[inputName].$dirty);
				el.toggleClass('has-error', formCtrl[inputName].$invalid && formCtrl[inputName].$dirty);
			});
			
			// show all validity results using the has-error class parameters
			scope.$on('show-errors-check-validity', function () {
				console.log('on show-errors-validity: [ ' + inputName + ' ] $invalid: ' + formCtrl[inputName].$invalid + ' $dirty: ' + formCtrl[inputName].$dirty);
				el.toggleClass('has-error', formCtrl[inputName].$invalid && formCtrl[inputName].$dirty);
			});
			
			// reset all has-xxxxx class parameters
			scope.$on('show-errors-reset', function () {
				$timeout(function () {
					console.log('show-errors-reset: ' + inputName);
					el.removeClass('has-warning');
					el.removeClass('has-success');
					el.removeClass('has-error');
				}, 0, false);
			});
		}
	};
});

myApp.directive('zautoFocus', ['$timeout',
  function ($timeout) {
    'use strict';
    console.log('zauto-focus triggered');
    return {
      restrict: 'A',
      link: function ($scope, $element) {
        $timeout(function () {
          $element[0].focus();
        });
      }
    };
  }
  ]);

myApp.directive('isOpen', function ($timeout) {
  'use strict';
	return {
		restrict: 'A',
    link: function (scope, element, attributes) {
      scope.$watch(function () {
        return element.attr('is-open');
      }, function () {
        //if (!angular.isUndefined('is-open') {
        console.log('directive isOpen is-open : ' + attributes.isOpen);
        //}
      });
    }
  };
});

myApp.directive('showAria', function ($timeout) {
  'use strict';
	return {
		restrict: 'A',
    link: function (scope, element, attributes) {
      scope.$watch(function () {
        return element.attr('aria-expanded');
      }, function () {
        //if (!angular.isUndefined('aria-expanded') {
        console.log('directive showAria aria-expanded : ' + attributes.ariaExpanded);
        //}
      });
    }
  };
});

myApp.directive('ariaCheck', function ($timeout) {
	'use strict';
	return {
		restrict: 'EA',
		link: function (scope, element, attrs) {
			element.bind('click', function () {
				//console.log(element.attr('class').includes('collapsed'));
				if (element.attr('class').includes('collapsed')) {
					element.addClass('glyphicon-chevron-up');
					element.removeClass('glyphicon-chevron-down');
				} else {
					element.addClass('glyphicon-chevron-down');
					element.removeClass('glyphicon-chevron-up');
				}
				//console.log(element.attr('aria-expanded'));
			});
      
      // reset glyphicon-chevron-down after trash buddy
			scope.$on('trash-reset', function () {
				$timeout(function () {
					element.addClass('glyphicon-chevron-down');
					element.removeClass('glyphicon-chevron-up');
        }, 500, false);
			});
          
		}
	};
});

myApp.controller('registerController', ['$scope', '$log', '$http', '$timeout', '$location', function ($scope, $log, $http, $timeout, $location) {
  'use strict';

	// function to initialize variables, this is used when the reset button is hit and after login success
	$scope.registerInit = function () {
		console.log('$scope.registerInit initializing');
		$scope.title = 'Register to get started...';
		$scope.subtitle = 'Login to get the good stuff.';
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';
    $scope.phone = '';
    $scope.email = '';
    $scope.password = '';
    $scope.verify = '';

		$scope.maxfirstnamecharacters = 50;
		$scope.maxlastnamecharacters = 50;
    $scope.minemailcharacters = 2;
		$scope.maxemailcharacters = 56;
		$scope.minpasswordcharacters = 6;

		$scope.typetitle = 'Type';
    $scope.companytitle = 'Company';
    $scope.employertitle = 'Employer';
    $scope.firstnametitle = 'First Name';
		$scope.lastnametitle = 'Last Name';
    $scope.addresstitle = 'Address';
    $scope.citytitle = 'City';
    $scope.statetitle = 'State';
    $scope.zipcodetitle = 'Zip';
    $scope.phonetitle = 'Phone';
    $scope.emailtitle = 'Email';
		$scope.passwordtitle = 'Password';
		$scope.verifytitle = 'Verify';

    window.scrollTo(0, 0);
    /* var em = document.getElementById('firstname');
    em.focus(); */
		return;
	};
	
	$scope.registerInit();

	$scope.changeEmail = function () {
		console.log('changeEmail() : ' + $scope.user.email);
		if ($scope.user.email === undefined) {
      if ($scope.userForm.email.$error.pattern) {
        $scope.emailtitle = 'Email format is invalid';
      } else {
        $scope.emailtitle = 'Email is required';
      }
		} else {
			if ($scope.user.email.length === $scope.maxemailcharacters) {
				console.log(' reached ' + $scope.maxemailcharacters + ' characters maximum');
				$scope.emailtitle = 'Email character maximum reached ' + $scope.maxemailcharacters;
			} else if ($scope.user.email.length < 3) {
				$scope.emailtitle = 'A valid Email is required';
			} else {
				$scope.emailtitle = 'Email';
			}
			console.log('changeEmail() : (' + $scope.user.email.length + ') (' + $scope.maxemailcharacters + ') ' + $scope.user.email);
		}
		$scope.$broadcast('show-errors-check-validity');
	};
	
	$scope.changePassword = function () {
		console.log('changePassword() :' + $scope.user.password);
		if ($scope.user.password === undefined) {
			$scope.passwordtitle = 'Password is required';
      $scope.userForm.password.$setValidity('length', false);
		} else if ($scope.user.password.length < $scope.minpasswordcharacters) {
			$scope.passwordtitle = 'Password must be at least 6 characters';
      $scope.userForm.password.$setValidity('length', false);
		} else {
			$scope.passwordtitle = 'Password';
      $scope.userForm.password.$setValidity('length', true);
		}
    
		if ($scope.user.verify !== undefined) {
			if ($scope.user.verify.length > 0) {
				$scope.verifytitle = 'These don\'t look like they match';
        $scope.userForm.verify.$setValidity('length', false);
			}
			if ($scope.user.verify === $scope.user.password) {
				$scope.verifytitle = 'Match';
        $scope.userForm.verify.$setValidity('length', true);
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeVerify = function () {
		console.log('changeVerify() :' + $scope.user.verify);
		if ($scope.user.verify === undefined) {
			$scope.verifytitle = 'Verify is required';
      $scope.userForm.verify.$setValidity('length', false);
		} else if ($scope.user.verify !== $scope.user.password) {
			$scope.verifytitle = 'These don\'t look like they match';
      $scope.userForm.verify.$setValidity('length', false);
		} else if ($scope.user.verify === $scope.user.password) {
			$scope.verifytitle = 'Match';
      $scope.userForm.verify.$setValidity('length', true);
		} else {
			$scope.verifytitle = 'Verify';
      $scope.userForm.verify.$setValidity('length', true);
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeFirstName = function () {
		console.log('changeFirstName() :' + $scope.user.firstname);
		if ($scope.user.firstname === undefined) {
			$scope.firstnametitle = 'First Name require name characters only, letters and ` \' - only';
			console.log('changeFirstName(' + $scope.user.firstname + ') First Name requires letters only');
		} else {
			if ($scope.user.firstname.length === $scope.maxfirstnamecharacters) {
				$scope.firstnametitle = 'First Name no more than 50 characters.';
				console.log('changeFirstName(' + $scope.user.firstname.length + ') First Name no more than 50 characters');
			} else {
				$scope.firstnametitle = 'First Name';
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeLastName = function () {
		console.log('changeLastName() :' + $scope.user.lastname);
		if ($scope.user.lastname === undefined) {
			$scope.lastnametitle = 'Last Name is optional, require name characters only, letters and ` \' - only';
		} else {
			if ($scope.user.lastname.length === $scope.maxlastnamecharacters) {
				$scope.lastnametitle = 'Last Name no more than 50 characters';
				console.log('changeLastName() :' + $scope.user.lastname.length + ') Last Name no more than 50 characters');
			} else {
				$scope.lastnametitle = 'Last Name';
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.registerReset = function () {
    console.log('$scope.loginReset clicked');
		$scope.user = { firstname: '', lastname: '', address: '', city: '', state: '', zipcode: '', phone: '', email: '', password: '', verify: ''};
		$scope.userForm.$setPristine();
		$scope.$broadcast('show-errors-reset');
		$scope.registerInit();
	};

	$scope.Register = function () {
    console.log('$scope.Register clicked : ' + $scope.user.firstname);
		if ($scope) {
      console.log('$scope.userForm : ' + $scope);
      window.alert('Thank you for registering, ' + $scope.user.firstname + '!');
      $timeout(function () {
        $scope.registerReset();
      }, 1000);
      //return;
			var hosttarget = './dbsource/register_add.php';
			$http.post(hosttarget, { userForm: $scope.user })
				.success(function (result) {
					if (result) {
						$scope.people = $scope.peopleTmp = result;
						//$scope.newPerson = '';
						window.alert('Thank you for registering, ' + $scope.user.firstname + '!');
            $timeout(function () {
              $scope.registerReset();
            }, 1000);
					}
				})
				.error(function (data, status) {
					console.log(data);
				});
		}
	};

}]);