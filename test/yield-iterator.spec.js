var chai = require('chai');
chai.use(require('chai-interface'));

var Iterator  = require('..');


describe('When creating an empty iterator', function () {
    it('Should immediately return an empty object', function () {

        var iter = new Iterator();
        var result = iter.next();

        chai.expect(result.done).to.be.true;
    });
});

describe('When creating a non-empty iterator', function () {
    it('Should return an actual object', function () {

        var base = 0;
        var iter = new Iterator(function () {
            if (base == 10) {
                return null;
            } else {
                base += 1;
                return base;
            }
        });

        for (var i = 0; i < 10; ++i) {
            var result = iter.next();
            chai.expect(result.done).to.be.false;
            chai.expect(result.value).to.equal(i + 1);
        }
    });
});

describe('When creating an iterator of a single value', function () {
    var iter = new Iterator('foo');

    it('Should return an object on first call', function () {
        var result = iter.next();
        chai.expect(result.done).to.be.false;
        chai.expect(result.value).to.equal('foo');
    });

    it('Should be done on second call', function () {
        var result = iter.next();
        chai.expect(result.done).to.be.true;
    });
});


describe('When creating an iterator of an array', function () {
    var arr  = ['foo', 'bar', 'wombat'];

    var iter = new Iterator(arr);

    it('Should iterate over the array', function () {
        for (var i = 0; i < arr.length; ++i) {
            var result = iter.next();
            chai.expect(result.done).to.be.false;
            chai.expect(result.value).to.equal(arr[i]);
        }
    });
});
