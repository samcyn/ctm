var app = {
    custombox: function(){
        var $btn = $(document).find('.modal_btn');

        if(!$btn){
            return;
        }
        $btn.on('click', function(){
        
            //var _dataAttr = $(this).data("modal");
            
            // Instantiate new modal
            var modal = new Custombox.modal({
                content: {
                    effect: 'fadein',
                    target: '#modal'
                },
                // Options
                loader : {
                    active: true,
                    color: '#000',
                    speed: 1500,
                }
            });
            
            // Open
            modal.open();
        });
        
    },
    sidebarController: function(){
        
        var navbar_initialized = false;

        lbd = {
            misc:{
                navbar_menu_visible: 0
            },
            initRightMenu: function(){  
                if(!navbar_initialized){
                    //clone the navbar
                    var $navbar = $('nav').find('.navbar-collapse').first().clone(true);

                    //get the left sidebar ready
                    var $sidebar = $('.products__menu-right').first().clone(true);
                    
                    //define an empty list to add items..
                    var ul_content = '';


                    $sidebar.children('ul').each(function(){
                        ul_content += $(this).html();
                    });
                        
                    //add the content from the regular header to the right menu
                    $navbar.children('ul').each(function(){
                        ul_content +=   $(this).html();  
                    });
                    
                    ul_content = '<aside class="rightSideBar"><ul class="menus">' + ul_content + '</ul></aside>';
                    
                    console.log(ul_content);

                    $('body').append(ul_content);
                
                    var $toggle = $('.navbar-toggler');
                    
                    $toggle.click(function (){    
                        if(lbd.misc.navbar_menu_visible == 1) {
                            $('html').removeClass('nav-open'); 
                            lbd.misc.navbar_menu_visible = 0;
                            $('#bodyClick').remove();
                            setTimeout(function(){
                                $toggle.removeClass('toggled');
                            }, 400);
                        
                        } else {
                            setTimeout(function(){
                                $toggle.addClass('toggled');
                            }, 430);
                            
                            var div = '<div id="bodyClick"></div>';
                            $(div).appendTo("body").click(function() {
                                $('html').removeClass('nav-open');
                                lbd.misc.navbar_menu_visible = 0;
                                $('#bodyClick').remove();
                                setTimeout(function(){
                                    $toggle.removeClass('toggled');
                                }, 400);
                            });
                        
                            $('html').addClass('nav-open');
                            lbd.misc.navbar_menu_visible = 1;
                            
                        }
                    });
                    navbar_initialized = true;
                }

            }
        }

        // Init navigation toggle for small screens   
        if($(window).width() <= 991){
            lbd.initRightMenu();   
        }

        // activate collapse right menu when the windows is resized 
        $(window).resize(function(){
            if($(window).width() <= 991){
                lbd.initRightMenu();   
            }
        });

    },
    sideMenuController: function(){
        
        var navbar_initialized = false;

        lbd = {
            misc:{
                navbar_menu_visible: 0
            },
            initRightMenu: function(){  
                if(!navbar_initialized){
                    // //clone the navbar
                    // var $navbar = $('nav').find('.navbar-collapse').first().clone(true);
                    
                    // console.log($navbar);
                    
                    
                    // //define an empty list to add items..
                    // var ul_content = '';
                    
                    // //add the content from the regular header to the right menu
                    // $navbar.children('ul').each(function(){
                    //     ul_content +=   $(this).html();  
                    // });
                    
                    // ul_content = '<aside class="rightSideBar"><ul class="menus">' + ul_content + '</ul></aside>';
                    
                    // $('body').append(ul_content);
                
                    var $toggle = $('.sidebar-toggler');
                    
                    $toggle.click(function (){    
                        if(lbd.misc.navbar_menu_visible == 1) {
                            $('html').removeClass('nav-open'); 
                            lbd.misc.navbar_menu_visible = 0;
                            $('#bodyClick').remove();
                            setTimeout(function(){
                                $toggle.removeClass('toggled');
                            }, 400);
                        
                        } else {
                            setTimeout(function(){
                                $toggle.addClass('toggled');
                            }, 430);
                            
                            var div = '<div id="bodyClick"></div>';
                            $(div).appendTo("body").click(function() {
                                $('html').removeClass('nav-open');
                                lbd.misc.navbar_menu_visible = 0;
                                $('#bodyClick').remove();
                                setTimeout(function(){
                                    $toggle.removeClass('toggled');
                                }, 400);
                            });
                        
                            $('html').addClass('nav-open');
                            lbd.misc.navbar_menu_visible = 1;
                            
                        }
                    });
                    navbar_initialized = true;
                }

            }
        }

        // Init navigation toggle for small screens   
        
        lbd.initRightMenu();
        // activate collapse right menu when the windows is resized 
        $(window).resize(function(){
            if($(window).width() <= 991){
                lbd.initRightMenu();   
            }
        });

    },
    menuController:function(){
        $('.rightSideBar .nav-link').on('click', function(){
            $('.rightSideBar .menus').find('.active').removeClass('active');
            $(this).parent().addClass('active');
        })
       
    },
    account_update: function(){
        $("#account_update").on('click', function(){
            this.tog = !this.tog;
            var _inputs = $(this).parents('form').find('input');
            $(this).text(this.tog ? 'Save' : 'Update');
            _inputs.toggleClass('borderless').attr('readonly', this.tog ? false : true);
        });
    },
    shuffleProducts: function(){
        
        var Shuffle = window.Shuffle;
        
        var Demo = function (element) {
            if(!element){
                return;
            }
            
            this.element = element;
        
            this.shuffle = new Shuffle(element, {
                itemSelector: '.products__column',
                sizer: element.querySelector('.my-sizer-element'),
            });
            
            // Log events.
            this.addShuffleEventListeners();
            
            this._activeFilters = [];
            
            this.addFilterButtons();
            this.addSorting();
            this.addSearchFilter();
            
            this.mode = 'exclusive';
        };
        
        Demo.prototype.toggleMode = function () {
          if (this.mode === 'additive') {
            this.mode = 'exclusive';
          } else {
            this.mode = 'additive';
          }
        };
        
        /**
         * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
         * for them like you normally would (with jQuery for example).
         */
        Demo.prototype.addShuffleEventListeners = function () {
          this.shuffle.on(Shuffle.EventType.LAYOUT, function (data) {
            console.log('layout. data:', data);
          });
        
          this.shuffle.on(Shuffle.EventType.REMOVED, function (data) {
            console.log('removed. data:', data);
          });
        };
        
        Demo.prototype.addFilterButtons = function () {
          var options = document.querySelector('.products__filter');
        
          if (!options) {
            return;
          }
        
          var filterButtons = Array.from(options.querySelectorAll('a'));
        
          filterButtons.forEach(function (button) {
            button.addEventListener('click', this._handleFilterClick.bind(this), false);
          }, this);
        };
        
        Demo.prototype._handleFilterClick = function (evt) {
          var btn = evt.currentTarget;
          var isActive = btn.classList.contains('products__active');
          var btnGroup = btn.getAttribute('data-group');
        
          // You don't need _both_ of these modes. This is only for the demo.
        
          // For this custom 'additive' mode in the demo, clicking on filter buttons
          // doesn't remove any other filters.
          if (this.mode === 'additive') {
            // If this button is already active, remove it from the list of filters.
            if (isActive) {
              this._activeFilters.splice(this._activeFilters.indexOf(btnGroup));
            } else {
              this._activeFilters.push(btnGroup);
            }
        
            btn.classList.toggle('products__active');
        
            // Filter elements
            this.shuffle.filter(this._activeFilters);
        
          // 'exclusive' mode lets only one filter button be active at a time.
          } else {
            this._removeActiveClassFromChildren(btn.parentNode.parentNode.parentNode);
        
            var filterGroup;
            if (isActive) {
              btn.classList.remove('products__active');
              filterGroup = Shuffle.ALL_ITEMS;
            } else {
              btn.classList.add('products__active');
              filterGroup = btnGroup;
            }
        
            this.shuffle.filter(filterGroup);
          }
        };
        
        Demo.prototype._removeActiveClassFromChildren = function (parent) {
          var children = Array.from(parent.querySelectorAll('a'));
          for (var i = children.length - 1; i >= 0; i--) {
            children[i].classList.remove('products__active');
          }
        };
        
        Demo.prototype.addSorting = function () {
          var buttonGroup = document.querySelector('.sort-options');
        
          if (!buttonGroup) {
            return;
          }
        
          buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
        };
        
        Demo.prototype._handleSortChange = function (evt) {
          // Add and remove `active` class from buttons.
          var wrapper = evt.currentTarget;
          var buttons = Array.from(evt.currentTarget.children);
          buttons.forEach(function (button) {
            if (button.querySelector('input').value === evt.target.value) {
              button.classList.add('products__active');
            } else {
              button.classList.remove('products__active');
            }
          });
        
          // Create the sort options to give to Shuffle.
          var value = evt.target.value;
          var options = {};
        
          function sortByDate(element) {
            return element.getAttribute('data-created');
          }
        
          function sortByTitle(element) {
            return element.getAttribute('data-title').toLowerCase();
          }
        
          if (value === 'date-created') {
            options = {
              reverse: true,
              by: sortByDate,
            };
          } else if (value === 'title') {
            options = {
              by: sortByTitle,
            };
          }
        
          this.shuffle.sort(options);
        };
        
        // Advanced filtering
        Demo.prototype.addSearchFilter = function () {
          var searchInput = document.querySelector('.products__search-bar').querySelector('input');
        
          if (!searchInput) {
            return;
          }
        
          searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
        };
        
        /**
         * Filter the shuffle instance by items with a title that matches the search input.
         * @param {Event} evt Event object.
         */
        Demo.prototype._handleSearchKeyup = function (evt) {
          var searchText = evt.target.value.toLowerCase();
        
          this.shuffle.filter(function (element, shuffle) {
        
            // If there is a current filter applied, ignore elements that don't match it.
            if (shuffle.group !== Shuffle.ALL_ITEMS) {
              // Get the item's groups.
              var groups = JSON.parse(element.getAttribute('data-groups'));
              var isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;
        
              // Only search elements in the current group
              if (!isElementInCurrentGroup) {
                return false;
              }
            }
        
            var titleElement = element.querySelector('.products__text');
            var titleText = titleElement.textContent.toLowerCase().trim();
        
            return titleText.indexOf(searchText) !== -1;
          });
        };
        
        document.addEventListener('DOMContentLoaded', function () {
          window.demo = new Demo(document.getElementById('grid'));
        });
    }
    
}