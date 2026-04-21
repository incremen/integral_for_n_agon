We'll skip the $2 \sin\left(\frac{\pi}{n}\right)$ part for now and get back to it at the end. Let's look at:

$$z(X) = \int_0^X e^{\left( i \frac{2\pi}{n} \sum_{k=1}^n \frac{1}{1 + e^{-(x-k)\theta}} \right)} dx$$

### 1. Graphing Complex Functions
Quick reminder: a complex number $z = a + bi$ plots on the complex plane just like Cartesian coordinates $(x, y)$, with the real part on the horizontal axis and the imaginary part on the vertical. **Euler's formula** gives us:
$$e^{i\varphi} = \cos(\varphi) + i\sin(\varphi)$$

So $e^{i\varphi}$ is always a unit vector pointing at angle $\varphi$. Its magnitude is strictly 1, regardless of $\varphi$.

When we integrate this with respect to $x$ (treating $x$ as time), the "pen" drawing the shape moves at constant speed 1. The integral accumulates movement, and since speed is fixed, the only thing that shapes the path is how the angle $\varphi$ in the exponent changes over time.

Think of it like driving a car. The exponent is the exact angle of your steering wheel at time $x$:

* **Turning Left (Increasing Angle):** In the complex plane, angle $0$ points East. Positive angles rotate counter-clockwise. If the exponent smoothly transitions from $0$ to $\pi/2$, the heading sweeps from East to North, and the path curves left.
* **Turning Right (Decreasing Angle):** If the exponent decreases over time (e.g., $0$ to $-\pi/2$), the heading sweeps clockwise, and the path curves right.
* **Driving Straight (Constant Angle):** If the exponent holds constant, the heading doesn't change, and the integral traces a straight line.

### 2. The Mechanism: Sigmoids and the Smooth Staircase
To draw a polygon, the car needs to drive straight, make a specific turn, and then drive straight again. We achieve this sequence using a **sigmoid function**.

A standard logistic sigmoid function is defined as:
$$f(x) = \frac{1}{1 + e^{-x}}$$

It is a continuous curve with two critical limits:
* $\lim_{x \to -\infty} f(x) = 0$
* $\lim_{x \to \infty} f(x) = 1$

By modifying the input to $f((x-k)\theta)$, we introduce two parameters:
* **$k$ (The Offset):** This shifts the function to the right along the x-axis. The transition from 0 to 1 will happen exactly when time $x$ crosses the integer $k$.
* **$\theta$ (Sharpness):** This multiplier determines how abruptly the transition happens. A low $\theta$ creates a slow, stretched-out curve (rounded corners). A high $\theta$ forces the transition to happen almost instantly (sharp corners).

To create multiple turns, we sum $n$ of these shifted sigmoids together:
$$\sum_{k=1}^n f((x-k)\theta)$$

Because each sigmoid flips from 0 to 1 at a different integer $k$, adding them together creates a continuous, **smooth staircase**. At $x=0$, the sum is 0. As time progresses, the total value steps up by 1 at every integer, until it reaches a maximum value of exactly $n$. Because the sum only goes up, the "car" only ever turns left.

### 3. Closing the Loop: Normalizing to 360 Degrees
Any closed polygon requires the drawing path to complete a full 360-degree rotation, meaning the exterior angles must sum to exactly $2\pi$ radians.

If we just used the raw staircase sum in the exponent, the steering wheel would turn by $1$ radian at each step, ending at a total rotation of $n$ radians. This does not close a shape. We must normalize the staircase:

1. **Divide by $n$:** We divide the staircase sum by $n$. Now, instead of stepping up to $n$, the entire staircase is squished so its maximum height at the end of the trip is exactly 1.
2. **Multiply by $2\pi$:** We scale that result up by $2\pi$.

Now, every time the staircase steps up by 1, the angle of the steering wheel changes by exactly $\frac{2\pi}{n}$. This perfectly matches the precise exterior angle required for a regular $n$-gon. By the end of the sum, the total accumulated angle is exactly $2\pi$.

Here's an example for how this should work for a square ($n = 4$), evaluated over the range $x = 0$ to $x = n$:

* **0 to 1 seconds:** No sigmoids have triggered. The sum is 0, the angle is 0. The car drives straight East for 1 second, drawing the bottom edge.
* **At 1 second:** The first sigmoid ($k=1$) triggers. The raw sum jumps to 1. The normalized angle jumps to $\frac{2\pi}{4}$ (90 degrees). The car turns left to face North.
* **1 to 2 seconds:** The angle stays at 90 degrees. The car drives North for 1 second, drawing the right edge.
* **At 2 seconds:** The second sigmoid ($k=2$) triggers. The sum jumps to 2. The angle jumps to $\frac{4\pi}{4}$ (180 degrees). The car turns left to face West.
* **2 to 3 seconds:** The car drives West for 1 second, drawing the top edge.
* **At 3 seconds:** The third sigmoid ($k=3$) triggers. The sum jumps to 3. The angle jumps to $\frac{6\pi}{4}$ (270 degrees). The car turns left to face South.
* **3 to 4 seconds:** The car drives South for 1 second, drawing the left edge and returning exactly to the origin.
* **At exactly 4 seconds:** The car is back at the start. The fourth sigmoid ($k=4$) triggers. The sum jumps to 4. The angle jumps to $\frac{8\pi}{4}$ (360 degrees, or $2\pi$). The car turns left one final time to face East, resetting to its exact starting orientation.

### 4. Fixing the size
We want our $n$-gon to be of a fixed size. A good way to think about this is to have a fixed **circumradius** of 1: the distance from the center of the polygon to any point.
This way, any shape will stick within a circle of radius one.
The function so far doesn't do this:

The magnitude of $e^{i\varphi(x)}$ is exactly 1, which is the **velocity** of the pen. If you drive at speed 1 for $n$ seconds, the total perimeter is exactly $n$, meaning every side has length 1. A regular polygon with a fixed side length of 1 has to expand its circumradius ($R \approx \frac{n}{2\pi}$) to fit more sides.

To hold the circumradius at $R = 1$ regardless of $n$, we have to change the speed of the pen instead. The side length $s$ of a unit $n$-gon (circumradius $R = 1$) is:
$$s = 2 \sin\left(\frac{\pi}{n}\right)$$

Multiplying the integrand by this scalar slows the pen down so that in 1 unit of time it travels exactly $s$. That gives us the full integral:
$$z(X) = \int_0^X 2 \sin\left(\frac{\pi}{n}\right) e^{\left( i \frac{2\pi}{n} \sum_{k=1}^n \frac{1}{1 + e^{-(x-k)\theta}} \right)} dx$$

This is what the "Constant Size" checkbox toggles on and off.

---

*Note: this integral probably has no nice closed-form solution (and finding one would be hell anyway), so we render it numerically using **Euler's method**, stepping forward in tiny increments of $dx$ and accumulating position.*
