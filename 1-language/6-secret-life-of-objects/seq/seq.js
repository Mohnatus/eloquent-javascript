function Seq(seq) {
    this.current = 0;
    this.seq = seq;
}

Seq.prototype.hasNext = function() {
    return true;
};

Seq.prototype.next = function() {
    if (!this.hasNext()) return undefined;
    var next = this.getNext();
    this.current++;
    return next;
};

function ArraySeq(arr) {
    Seq.call(this, arr);
}
ArraySeq.prototype = Object.create(Seq.prototype);
ArraySeq.prototype.constructor = ArraySeq;
ArraySeq.prototype.hasNext = function() {
    return this.current < this.seq.length;
}
ArraySeq.prototype.getNext = function() {
    return this.seq[this.current];
}

function RangeSeq(from, to) {
    this.from = from;
    this.to = to;
    Seq.call(this, null);
}
RangeSeq.prototype = Object.create(Seq.prototype);
RangeSeq.prototype.constructor = RangeSeq;
RangeSeq.prototype.hasNext = function () {
    return this.current + this.from <= this.to;
}
RangeSeq.prototype.getNext = function () {
    return this.from + this.current;
}

module.exports = {
    ArraySeq, RangeSeq
};