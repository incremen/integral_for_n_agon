# The Integral Gear

This is a variation on the [$n$-gon](../index.html) integral. Same car-with-a-steering-wheel setup, but now each side of the polygon has a square bump (a tooth) rammed into it.

### The Zero-Net-Turn Trick

A mechanical gear (or sprocket) is essentially an $n$-sided polygon where every side has a square bump (a tooth) in the middle of it.

To draw this using our integral approach, we use a trick: the **"Zero-Net-Turn"** sequence. To draw a square tooth on a flat edge, the pen must make four turns:

1. Turn Left $90°$ ($+\pi/2$) to go up the tooth.
2. Turn Right $90°$ ($-\pi/2$) to go across the top.
3. Turn Right $90°$ ($-\pi/2$) to go down the other side.
4. Turn Left $90°$ ($+\pi/2$) to return to the baseline.

If you add those up ($90 - 90 - 90 + 90$), the net rotation is exactly $0°$. The pen is facing the exact same direction it was before the tooth. Because the tooth itself contributes zero net rotation, we can simply add the macroscopic polygon turn ($\frac{2\pi}{n}$) to the very last step to curve the gear and close the loop.

Here is the explicit integral for a gear with $n$ teeth. Let $\sigma(t) = \frac{1}{1 + e^{-\theta t}}$.

$$
z(X) = \int_0^X \exp\!\left( i \sum_{r=0}^{n-1} \left[
\begin{aligned}
  & +\tfrac{\pi}{2}\sigma(x - t_1) \\
  & -\tfrac{\pi}{2}\sigma(x - t_2) \\
  & -\tfrac{\pi}{2}\sigma(x - t_3) \\
  & +\left(\tfrac{\pi}{2} + \tfrac{2\pi}{n}\right)\sigma(x - t_4)
\end{aligned}
\right] \right) dx
$$

The timing variables ($t$) are based entirely on the physical dimensions you want for the gear: the width of the inner gap ($g$), the height of the tooth ($h$), and the width of the tooth top ($w$).

* $t_1 = g$
* $t_2 = g + h$
* $t_3 = g + h + w$
* $t_4 = g + 2h + w$

Inside each tooth's $r$-th repetition, $x$ is offset by $r \cdot L$ (where $L = t_4$ is one full tooth period), so every tooth fires its four sigmoids one after the next.

### What the sliders do

* **$n$** — number of teeth. Also sets the macroscopic turn $\tfrac{2\pi}{n}$.
* **$h$** — tooth height: how far the tooth pokes out.
* **$w$** — tooth width: how wide the top of the tooth is.
* **$g$** — gap: flat section between teeth.
* **$\theta$** — sharpness. Low $\theta$ rounds every corner; high $\theta$ locks them to crisp right-angles.
