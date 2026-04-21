We'll skip the $2 \sin\left(\frac{\pi}{n}\right)$ part for now and get back to it at the end. Let's look at:

$$z(X) = \int_0^X e^{i \frac{2\pi}{n} \sum_{k=1}^n \frac{1}{1 + e^{-(x-k)\theta}}} dx$$

### 1. The Engine: Euler's Identity and the Complex Plane
The foundation of this expression relies on **Euler's formula**:
$$e^{i\varphi} = \cos(\varphi) + i\sin(\varphi)$$

In the complex plane, a number $z = a + bi$ functions exactly like Cartesian coordinates $(x, y)$. The real part ($\cos(\varphi)$) sits on the horizontal axis and the imaginary part ($\sin(\varphi)$) sits on the vertical axis.

The **magnitude** is the length of the vector from the origin, calculated using the Pythagorean theorem: $|z| = \sqrt{a^2 + b^2}$.
For our expression, the magnitude is:
$$\sqrt{\cos^2(\varphi) + \sin^2(\varphi)} = \sqrt{1} = 1$$

Because this always equals 1, the magnitude of $e^{i\varphi}$ is strictly 1, regardless of what $\varphi$ is.

### 2. The Steering Wheel: Direction and Turning
When we integrate this function with respect to $x$ (treating $x$ as time), the "pen" drawing the shape moves at a constant velocity of 1 unit per second. The integral acts as an accumulator of movement. Since the speed cannot change, the only thing that dictates the shape of the path is the angle $\varphi$ in the exponent.

Think of the integration process like driving a car. The exponent represents the exact angle of your steering wheel at any given time $x$. To determine whether the path turns left or right, we look at the rate of change of the exponent as time moves forward:

* **Turning Left (Increasing Angle):** In the complex plane, angle $0$ points straight right (East). Positive angles rotate counter-clockwise. If the exponent increases over time—for example, smoothly transitioning from $0$ to $\pi/2$—the heading sweeps from East to North. This results in the path curving to the left.
* **Turning Right (Decreasing Angle):** If the exponent decreases over time (e.g., $0$ to $-\pi/2$), the heading sweeps clockwise, curving the path to the right.
* **Driving Straight (Constant Angle):** If the exponent remains constant, the heading does not change, and the integral traces a perfectly straight line.

### 3. The Mechanism: Sigmoids and the Smooth Staircase
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

### 4. Closing the Loop: Normalizing to 360 Degrees
Any closed polygon requires the drawing path to complete a full 360-degree rotation, meaning the exterior angles must sum to exactly $2\pi$ radians.

If we just used the raw staircase sum in the exponent, the steering wheel would turn by $1$ radian at each step, ending at a total rotation of $n$ radians. This does not close a shape. We must normalize the staircase:

1. **Divide by $n$:** We divide the staircase sum by $n$. Now, instead of stepping up to $n$, the entire staircase is squished so its maximum height at the end of the trip is exactly 1.
2. **Multiply by $2\pi$:** We scale that result up by $2\pi$.

Now, every time the staircase steps up by 1, the angle of the steering wheel changes by exactly $\frac{2\pi}{n}$. This perfectly matches the precise exterior angle required for a regular $n$-gon. By the end of the sum, the total accumulated angle is exactly $2\pi$.

### 5. The Path: The Trip from 0 to $n$
The integral is evaluated over the range $x = 0$ to $x = n$. Here is the exact timeline mapped out for a square ($n = 4$):

* **0 to 1 seconds:** No sigmoids have triggered. The sum is 0, the angle is 0. The car drives straight East for 1 second, drawing the bottom edge.
* **At 1 second:** The first sigmoid ($k=1$) triggers. The raw sum jumps to 1. The normalized angle jumps to $\frac{2\pi}{4}$ (90 degrees). The car turns left to face North.
* **1 to 2 seconds:** The angle stays at 90 degrees. The car drives North for 1 second, drawing the right edge.
* **At 2 seconds:** The second sigmoid ($k=2$) triggers. The sum jumps to 2. The angle jumps to $\frac{4\pi}{4}$ (180 degrees). The car turns left to face West.
* **2 to 3 seconds:** The car drives West for 1 second, drawing the top edge.
* **At 3 seconds:** The third sigmoid ($k=3$) triggers. The sum jumps to 3. The angle jumps to $\frac{6\pi}{4}$ (270 degrees). The car turns left to face South.
* **3 to 4 seconds:** The car drives South for 1 second, drawing the left edge and returning exactly to the origin.
* **At exactly 4 seconds:** The car is back at the start. The fourth sigmoid ($k=4$) triggers. The sum jumps to 4. The angle jumps to $\frac{8\pi}{4}$ (360 degrees, or $2\pi$). The car turns left one final time to face East, resetting to its exact starting orientation.

### 6. Numerical Rendering (Euler's Method)
Because this integral is a composition of sigmoids inside a complex exponential, it does not have a standard closed-form solution. To evaluate it (and draw it with code), we discretize it using **Euler's Method**.

Euler's method approximates the accumulated area by breaking the continuous function into small, distinct steps:
1.  **Initialize:** Start at position $z_0 = (0, 0)$.
2.  **Iterate:** Choose a tiny step size for time, $dx$ (e.g., $0.01$).
3.  **Evaluate:** At the current time $x$, calculate the exact angle $\varphi$ using the formula.
4.  **Accumulate:** Multiply the current vector by the step size to get the distance traveled in that micro-second, and add it to your position:
    $x_{new} = x_{old} + \cos(\varphi) \cdot dx$
    $y_{new} = y_{old} + \sin(\varphi) \cdot dx$
5.  **Repeat:** Increment $x$ by $dx$ and repeat until $x = n$.

This blind, iterative vector addition draws the polygon perfectly. The computer calculates no vertices and uses no hardcoded geometry; the shape emerges entirely from the math.

### 7. Bounding the Growth: Velocity vs. Position
If you evaluate the base integral, the polygon grows larger as $n$ increases. Why? Because the magnitude of $e^{i\varphi(x)}$ is exactly 1. This represents the **velocity** of the pen.

If you drive at a constant speed of 1 unit/sec for $n$ seconds, you draw a shape with a total perimeter of exactly $n$. This means every individual side has a length of exactly 1. A regular polygon with a fixed side length of 1 must expand its radius ($R \approx \frac{n}{2\pi}$) to physically fit more sides.

To force the shape to maintain a constant circumradius of $R=1$ regardless of $n$, we must change the speed of the pen. The exact side length $s$ of a unit $n$-gon is defined by trigonometry:
$$s = 2 \sin\left(\frac{\pi}{n}\right)$$

By multiplying our integrand by this scalar, we adjust the velocity so that the pen travels exactly the required side length in 1 unit of time. The scaled integral is:
$$z(X) = \int_0^X 2 \sin\left(\frac{\pi}{n}\right) e^{i \frac{2\pi}{n} \sum_{k=1}^n \frac{1}{1 + e^{-(x-k)\theta}}} dx$$

This is what the "Constant Radius" checkbox does.

Because we evaluate this strictly from the origin without arbitrary geometry offsets, the first vertex is anchored at $(0,0)$. The resulting shape perfectly inscribes within a unit circle that is shifted slightly into the positive real plane.
