
QUnit.module('$ like library challenge!');

QUnit.test( 'DOM manipulation', function(assert) {

    var $container = $('#container');
    var container = document.getElementById('container');
    
    assert.ok(!!$container, '$("#container") does not return undefined');
    assert.equal($container.el.id, container.id, '$("#container") return the correct element');

    var $p = $('<p></p>');

    assert.ok(!!$p, '$("<p></p>") does not return undefined');
    assert.equal($p, '<p></p>', '$("<p></p>") creates the correct element');

    $p.html('<strong>Some html content</strong>');

    $('#container').html($p);

    assert.equal(container.innerHTML, '<p><strong>Some html content</strong></p>', '$().html() works as expected');
    assert.equal($container.text(), container.textContent, '$().text() works as expected');
});

QUnit.test('Utilities (Functional programming)', function(assert) {
    var array = [1, 2, 3, 4, 5];
    var object = {
        one: 'one',
        two: 2,
        three: 'three',
        four: 4,
        five: 'V'
    };
    var eachArray = 0;
    var eachObject = {};
    var proxyFn = function () {
        return this.two + this.four;
    };

    $.each(array, function(index, value) {
        eachArray += value;
    });

    $.each(object, function(key, value) {
        eachObject[key] = value;
    });

    assert.ok(eachArray === 15, '$.each() works as expected when use it with an array');
    assert.deepEqual(object, eachObject, '$.each() works as expected when use it with an object');

    assert.equal($.inArray(3, array, 1), 2, '$.inArray() return the correct index for found items');
    assert.equal($.inArray(9, array, 1), -1, '$.inArray() return -1 for NOT found items');

    assert.ok($.isArray(array) && !$.isArray(object), '$.isArray() works as expected');
    assert.ok($.isFunction(function(){}) && !$.isFunction(object), '$.isFunction() works as expected');
    assert.ok($.isNumeric(1) && $.isNumeric('1') && $.isNumeric('1.25') && !$.isNumeric(object), '$.isNumeric() works as expected');

    var proxyTestFn = $.proxy(proxyFn, object);
    assert.equal(typeof proxyTestFn, 'function', '$.proxy(function, context) generates a function');
    assert.equal(proxyTestFn(), 6, '$.proxy(function, context) generated function uses the correct context');

    // Watch out for objects references when copying!
    var extendedObj = $.extend(object, {six: 'six'});
    assert.equal(extendedObj.six, 'six', '$.extend() works as expected.');    
});

QUnit.test('Events', function(assert) {

    $('#container').click(function (e) {
        assert.equal(this.id, e.target.id, '$().click() listen and trigger as expected');
    });

    $('#container').click();
});