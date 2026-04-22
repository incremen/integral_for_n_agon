# The Integral n-star

Same idea as the [n-gon](index.html), but we want a star instead of a regular polygon. The trick is to double the number of sigmoids and let them contribute different turn angles.

$$z(x) = \int_0^x \exp\!\left( i \frac{\pi}{n} \sum_{k=1}^{2n} \frac{1 + (-1)^{k+1} s}{1 + e^{-(y-k)\theta}} \right) dy$$

### 1. Why 2n sigmoids

A regular $n$-gon has $n$ corners, and we built it with $n$ sigmoids. A star with $n$ points has $2n$ corners (the outer points and the inner valleys between them), so we need $2n$ sigmoids triggering at $y = 1, 2, \dots, 2n$.

### 2. Alternating turn angles

At each corner the "car" turns by a specific angle. For the whole path to close into a star, all the turns still have to add up to $2\pi$ (one full rotation).

In the n-gon case every corner turned by the same amount, $\frac{2\pi}{n}$. For the star we want alternating amounts: a sharper turn at outer points and a gentler (or reflex) turn at inner valleys. That's what the $(-1)^{k+1} s$ factor does:

* **Odd $k$ (outer points):** the coefficient is $\frac{\pi}{n}(1 + s)$
* **Even $k$ (inner valleys):** the coefficient is $\frac{\pi}{n}(1 - s)$

No matter what $s$ is, summing $n$ of each gives exactly $2\pi$ of total turn.

The parameter $s$ (star-ness) controls how sharp the outer points are versus how flat the inner valleys are:

* **$s = 0$:** every corner turns the same amount ($\frac{\pi}{n}$), so you get a regular $2n$-gon.
* **$s = 1$:** inner valleys don't turn at all, so neighboring edges are collinear. You get a regular $n$-gon.
* **$s = 2$:** inner valleys turn in the opposite direction (reflex turns). This gives the classic $n$-pointed star.

### 3. Everything else is the same

Sharpness $\theta$ still controls how abruptly each sigmoid fires, which controls how sharp the corners are. Integration still runs from $y = 0$ to $y = 2n$.

---

*Same Euler's-method rendering as the n-gon page.*
