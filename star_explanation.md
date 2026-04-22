# The Integral $n$-star

This is an extension of the [$n$-gon](index.html) construction. The core trick is the same: sum shifted sigmoids in the exponent of the complex exponential so that the integration "pen" turns at specific times. For a star, we just need more sigmoids and a way to make some turns sharper than others.

$$z(X) = \int_0^X e^{\left( i \frac{\pi}{n} \sum_{k=1}^{2n} \frac{1 + (-1)^{k+1} s}{1 + e^{-(x-k)\theta}} \right)} dx$$

### 1. Counting the corners

A regular $n$-gon has $n$ corners, and we built it with exactly $n$ sigmoids triggering at $x = 1, 2, \dots, n$.

An $n$-pointed star has $2n$ corners: $n$ outer points and $n$ inner valleys between them. So, we need $2n$ sigmoids, triggering at $x = 1, 2, \dots, 2n$. Odd values of $k$ will correspond to the outer points, and even values of $k$ to the inner valleys.

Because we are making twice as many turns, the integration runs from $x = 0$ to $x = 2n$ instead of $0$ to $n$.

### 2. Why equal turns won't work

In the $n$-gon, every sigmoid contributed the same exterior angle of $\frac{2\pi}{n}$ to the steering wheel. If we did the same thing here, $2n$ sigmoids each contributing $\frac{2\pi}{2n} = \frac{\pi}{n}$ would just give us a regular $2n$-gon. Not a star.

To get a star, we need **alternating** turns: a large turn at each outer point, followed by a smaller (or even negative) turn at each inner valley, repeating until the shape is closed.

### 3. Building the alternating coefficient

Let's give each sigmoid its own turn angle, $c_k$. We have two constraints:

1.  **Odd $k$ and even $k$ get different values** (to create alternating corners).
2.  **The total accumulated turn must still sum to $2\pi$** (so the path closes).

Constraint 2 is straightforward: if the $n$ odd corners each contribute angle $a$, and the $n$ even corners each contribute angle $b$, then the total rotation is $n(a + b)$. Setting that equal to $2\pi$ gives $a + b = \frac{2\pi}{n}$.

The most natural way to achieve this is to take the "average" turn $\frac{\pi}{n}$ and split it symmetrically by adding and subtracting a modifier (our "star-ness" parameter, $s$):

* **Odd $k$:** $c_k = \frac{\pi}{n}(1 + s)$
* **Even $k$:** $c_k = \frac{\pi}{n}(1 - s)$

Notice that $a + b = \frac{\pi}{n}(1 + s) + \frac{\pi}{n}(1 - s) = \frac{2\pi}{n}$ for *any* value of $s$. The math guarantees the loop will always close perfectly.

### 4. Writing it as one expression

Instead of writing a piecewise definition for $c_k$, we can fold the alternating logic directly into the formula using the alternating sequence $(-1)^{k+1}$:

$$c_k = \frac{\pi}{n} \left( 1 + (-1)^{k+1} s \right)$$

At odd values of $k$ (where $(-1)^{k+1} = +1$), this evaluates to $\frac{\pi}{n}(1 + s)$. At even values of $k$ (where $(-1)^{k+1} = -1$), it evaluates to $\frac{\pi}{n}(1 - s)$. Plugging this $c_k$ into the sigmoid sum gives us the full integrand at the top of the page.

### 5. What the star-ness parameter ($s$) does

The parameter $s$ elegantly interpolates between different families of shapes:

* **$s = 0$:** Every corner turns by exactly $\frac{\pi}{n}$. This draws a regular $2n$-gon.
* **$0 < s < 1$:** The outer corners are sharper than the inner ones. This draws a "bumpy" polygon.
* **$s = 1$:** The inner-valley turns become exactly zero ($\frac{\pi}{n}(1-1)$). The $2n$ corners collapse into $n$ corners as the edges on either side of the valley merge into a single straight line. This draws a regular $n$-gon.
* **$1 < s < 2$:** The inner turns become *negative*. The "car" actually steers to the right for a moment at every valley before resuming its left-hand turns at the outer points. This enters classic star territory.
* **$s = 2$:** The geometry locks into perfect proportions. For $n = 5$, this draws the standard, perfectly intersecting five-pointed star.

### 6. Sharpness ($\theta$)

Just like in the $n$-gon, $\theta$ controls how abruptly each turn happens. A low $\theta$ smears the turn across a wide interval of time, resulting in rounded, balloon-like outer points and smooth inner valleys. A high $\theta$ forces the sigmoids to behave like instant step functions, producing infinitely sharp corners.
