module.exports = function (generator) {

    var objectType = Object.prototype.toString.call(generator);

    // If no generator was provided, provide a no-op generator.
    if (!generator) {
        generator = function () { return null; }
    } else if (objectType == "[object Array]") {

        var i   = 0;
        var arr = generator;

        generator = function () {
            if (i < arr.length) {
                return arr[i++];
            }

            return null;
        };

    } else if (objectType != "[object Function]") {
        // If the generator is a single value, make a one-pass iterator.
        var done = false;
        var val  = generator;

        generator = function () {
            if (done == false) {
                done = true;
                return val;
            } else {
                return null;
            }
        };
    };

    return {
        next: function () {
            var result = generator();
            var done   = false;

            if (result == null) {
                done = true;
            };

            return {
                value: result,
                done:  done
            };
        }
    };
};
